#![feature(try_blocks)]

use marine_rs_sdk::module_manifest;
use marine_rs_sdk::WasmLoggerBuilder;

pub mod curl_transport;
pub mod eth_call;
pub mod values;

module_manifest!();

pub fn main() {
    WasmLoggerBuilder::new()
        .with_log_level(log::LevelFilter::Info)
        .build()
        .unwrap();
}
