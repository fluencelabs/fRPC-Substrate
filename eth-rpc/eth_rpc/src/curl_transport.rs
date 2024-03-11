use std::fs;
use std::io::BufReader;
use std::sync::atomic::{AtomicUsize, Ordering};
use std::sync::Arc;

use jsonrpc_core::types::request::Call;
use jsonrpc_core::Output;
use marine_rs_sdk;
use serde_json::json;
use serde_json::Value;
use web3::futures::future::BoxFuture;
use web3::{RequestId, Transport};

use curl_effector_imports::curl_post;
use curl_effector_imports::{CurlRequest, HttpHeader};

pub type FutResult = BoxFuture<'static, web3::error::Result<Value>>;

#[derive(Debug, Clone)]
pub struct CurlTransport {
    pub uri: String,
    id: Arc<AtomicUsize>,
}

impl CurlTransport {
    pub fn new(uri: String) -> Self {
        Self {
            uri,
            id: Arc::new(AtomicUsize::new(0)),
        }
    }

    pub fn next_id(&self) -> RequestId {
        self.id.fetch_add(1, Ordering::AcqRel)
    }
}

impl Transport for CurlTransport {
    type Out = FutResult;

    fn prepare(&self, method: &str, params: Vec<Value>) -> (RequestId, Call) {
        let id = self.next_id();
        let request = web3::helpers::build_request(id, method, params.clone());
        (id, request)
    }

    fn send(&self, id: RequestId, call: Call) -> Self::Out {
        if let Call::MethodCall(call) = call {
            let uri = self.uri.clone();

            Box::pin(async move {
                let json: String = json!(call).to_string();
                let data_filename = format!("request-{}.json", id);
                let data_path = vault_path(&data_filename);

                let response_filename = format!("response-{}.json", id);
                let response_path = vault_path(&response_filename);

                let headers = vec![
                    HttpHeader {
                        name: "accept".to_string(),
                        value: "application/json".to_string(),
                    },
                    HttpHeader {
                        name: "content-type".to_string(),
                        value: "application/json".to_string(),
                    },
                ];
                let request = CurlRequest { url: uri, headers };

                fs::write(&data_path, json.as_bytes())?;
                let result = curl_post(request, data_path, response_path.clone());

                if !result.success {
                    return Err(web3::error::Error::Transport(
                        web3::error::TransportError::Message(format!("error: {}", result.error)),
                    ));
                }

                let response_file = fs::File::open(&response_path)?;
                let rdr = BufReader::new(response_file);
                let response: Value = serde_json::from_reader(rdr)?;
                let response: Output = serde_json::from_value(response)?;
                let result = match response {
                    Output::Success(jsonrpc_core::types::Success { result, .. }) => result,
                    Output::Failure(jsonrpc_core::types::Failure { error, .. }) => {
                        serde_json::to_value(error.message).unwrap()
                    }
                };

                Ok(result)
            })
        } else {
            todo!()
        }
    }
}

// Since all effectors are working via the Particle Vault, you need to provide a correct path to the vault.
// At the moment, we don't have any nice library for this sort of things, so you need to do it manually.
//
// Here we need to create a path to the vault which has a form of `/tmp/vault/{particle-id}-{particle-token}`.
// In this directory, you can freely write and read any files you need. Note that this directory exists only when
// a particle that called the function exsits, so you'll see here a different path each run.
fn vault_path(filename: &str) -> String {
    let cp = marine_rs_sdk::get_call_parameters();
    format!(
        "/tmp/vault/{}-{}/{}",
        cp.particle.id, cp.particle.token, filename
    )
}
