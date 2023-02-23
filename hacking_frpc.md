# Hacking Decentralized RPC with Fluence

**WIP*

## Overview

Running blockchain nodes to support your dApps read to and write from chain needs tends to be rather resource intensive and not surprisingly, Web3 developers tend to gravitate toward integrating their dApps with hosted blockchain JSON-RPC gateways. Alas, "RPC as SaaS" introduces centralized bottlenecks challenging the availability, reliability and Web3 ethos of dApps while quite often raising the exit barriers by providing custom API overlays to the EVM JSON-RPC convention. To accelerate dApp developers opportunity to utilize decentralized RPC, Fluence is providing a decentralized RPC (fRPC) substrate.

Fluence's decentralized serverless stack allows developers to quickly create decentralized applications and protocols from their own or third-party services distributed over a peer-to-peer network. Specifically, developers express their business logic in Rust code, compile it to wasm32-wasi and deploy those modules + linking instructions as a *service* to network peers willing to host the service. In order for developers to get their services hosted and executed, they need to pay hosting peers in stablecoin such as USDC.

The Fluence protocol uses the concept of a [Deal](https://fluence.dev/docs/build/glossary#deal) to bridge on- and off-chain relationships. Deals describe the developer's services and the necessary hosting providers resources to execute the developer's requirements, aka job. Deal creation, and developers' financial commitment toward a created Deal, is a critical step preceding the deployment of services to peers and is easily created with Fluence and popular Web3 tooling.

At this point, all economics are at the testnet level using testnet tokens. Moreover, the marketplace for deals isn't quite finished. Instead of using the Fluence marketplace to create and negotiate your deals, Fluence hardcoded a set of parameters, i.e. price of execution per epoch and epoch duration, which is used by Fluence CLI to create the corresponding transaction for you to sign with your wallet, e.g., MetaMask.

The idea behind fRPC is to give you a basic code base to accelerate your journey toward adding decentralized RPC to your dAPP. *fRPC is not a production ready product*, far from; instead, it is a playground intended for you to customize and extend to suit your dAPPs' needs. In fact, we are offering hackathons to further incentivize you to experiment and *buidl*.

Upcoming Fluence hackathons with fRPC bounties:

* [ETHDenver 2023](https://www.ethdenver.com/) and also see the Fluence [event and bounty](https://github.com/fluencelabs/ethdenver-2023) repo

## Setting Up

To get going, you need install and setup a few dependencies outlined below.

### Off-chain Dependencies

* [node](https://nodejs.org/en/) 16 LTS (versions 18.* and 19.* are currently not supported)
* [Fluence CLI](https://github.com/fluencelabs/fluence-cli)
* [Rust](https://www.rust-lang.org/tools/install) (optional; Fluence CLI will install if not already in your environment)
* For VSCode, there is a helpful [Aqua language support](https://marketplace.visualstudio.com/items?itemName=FluenceLabs.aqua) package available

Note that Fluence CLI installs missing dependencies as need ("lazy install"). If you want all your dependencies installed at once, use the `fluence dependencies i`.

### On-chain Dependencies

* Wallectconnect compatible wallet, e.g., MetaMask, setup for and funded with:
  * [Polygon](https://polygon.technology/) [Mumbai testnet](https://chainlist.org/?testnets=true&search=mumbai)
  * [MATIC testnet faucet](https://faucet.polygon.technology/) [or](https://mumbaifaucet.com/)
  * [Fluence USDC testnet faucet](https://faucet.fluence.dev/)

### API Keys

Since fRPC works with existing RPC providers or even self-hosted nodes, you want at least three provider urls and, if necessary, API keys to *the* chain of your choice. Yes, multi-chain support is currently not supported but for you to implement. For Ethereum's Goerli testnet, for example:

* Infura: https://goerli.infura.io/v3/<your key>
* Alchemy: https://eth-goerli.g.alchemy.com/v2/<your key>
* QuickNode: https://frequent-sleek-river.ethereum-goerli.discover.quiknode.pro/<your key>/

All three of the listed providers have a free account option and support the API key in the url, rather than the header, which is the current gateway implementation choice; a choice you should feel free to override and customize to your needs.

## Tools And Tooling

The most prominent developer tool is [Fluence CLI](https://github.com/fluencelabs/fluence-cli), which allows you to manage the entire lifecycle of a project including Rust and Aqua code as well as Deals. From scaffolding your project, services and modules to deal creation and service deployment, Fluence CLI has you covered. Moreover, Fluence CLI can scaffold JS projects using [js-client](https://github.com/fluencelabs/js-client) allowing you to create, or integrate, Fluence projects for the browser or node app. See Figure 1 for a quick overview of workflows managed by Fluence CLI and the associated commands. If you have Fluence CLI installed, use `fluence --help` to get a more complete overview of topics and commands.

Figure 1: Stylized Project Creation And Deployment Workflow With Fluence CLI

```mermaid

    stateDiagram
    
    [*] --> InitProject: fluence init
    InitProject --> CreateNewService: fluence service new
    InitProject --> AddExistingService: fluence service add
    CreateNewService --> Service
    AddExistingService --> Service
    Service --> AddNewModules: fluence module new
    Service --> AddExistingModules: fluence module add
    Service --> LocalTesting: fluence service repl, cargo test
    Service --> DeployedService: fluence deal deploy
    DeployedService --> RunService: fluence run
```

If you are not familiar with Fluence terminology or just need a quick reminder, see the [Glossary](https://fluence.dev/docs/build/glossary) or [documentation](TBD).

## fRPC Substrate

Fluence's *fRPC Substrate* is a starter kit comprising all the components you need to quickly enable you to enable your dAPPs with decentralized RPC using existing centralized RPC providers, e.g., Infura, Alchemy, QuickNode, etc. The substrate consists of the following code components:

* RPC API adapter code written in Rust and compiled to wasm32-wasi that are deployable to any peer in the FLuence p2p network
* Aqua code for distributed algorithms, such as Round Robin, Failover and Quorum, using the distributed Wasm connectors for request-response handling over libp2p
* A gateway app server that bridges libp2p transport to the HTTP transport expected by your dAPPs' Web3 SDK, such as web3js, ethers, etc. Note that the expectation at this point is for you to *self-host* the gateway locally or in the cloud.

See Figure 2 for an end-to-end workflow representation of your dAPP with fRPC.

Figure 2: Stylized fRPC Use With dAPPs

```mermaid
    sequenceDiagram
    
    participant D as dApp
    participant G as Gateway
    participant N as Fluence p2p network
    participant R as Centralized RPC providers
    
    G ->> G: Configure and start Gateway
    D ->> D: Use gateway Address:port in web3 sdk setup
    D ->> G: Make Web3 request
    G ->> N: Call one or more Fluence services
    N ->> R: Call one or more different RPC providers
    R ->> N: Services processes response based on specified algo
    N ->> G: Gateway receives "curated" response
    G ->> D: dApp receives response
    D ->> D: dApp does its thing
```

### Working With fRPC Substrate

soon

#### Distributed RPC API Adapters With Marine

In the "./wasm-modules/" directory, you find two modules: *curl_adapter* and *eth-rpc*, each comprised of the Rust code and a configuration file called *module.yaml*, which are referenced in the top directory's *service.yaml* file. Now, what are those modules good for?

#### Curl Adapter

Wasm modules are socket-less, single-threaded entities confined to a sandbox keeping the host safe. However, Marine modules come with a configuration file that not only allows a module to "punch through" the sandbox and have access to a host's resources but also for a host to permission such access. No permission from the host, no access. This information if contained in the *module.yaml*:

```yaml
version: 0
type: rust
name: curl_adapter
mountedBinaries:
  curl: /usr/bin/curl
```

Which basically states that the Wasm module named *curl_adapter* wants access to a binary callable with the (host) path `/usr/bin/curl`. Looking at the the *main.rs* file:

```Rust
use marine_rs_sdk::{marine, MountedBinaryResult};

pub fn main() {}

#[marine]
pub fn curl_request(cmd: Vec<String>) -> MountedBinaryResult {
    curl(cmd)
}

#[marine]
#[link(wasm_import_module = "host")]
extern "C" {
    fn curl(cmd: Vec<String>) -> MountedBinaryResult;
}
```

In order to make access to the host's binary happen, we use Rust's FFI interface to link a function names *curl*, taking an array of strings as its argument, and expose it to the module via the `#[marine]` macro. We then wrap the *curl* function with the *curl_request* function for the whole purpose to expose it, via the `#[marine]` macro, as the sole exported function. Why? so any other Wasm module in need of curl access can link to the *curl_adapter* and utilize the *curl_request* function to make *curl* calls including out *eth-rpc* module.

#### ETH RPC Module

The *eth_rpc* module uses [Web3](https://crates.io/crates/web3), a Rust EVM json-rpc client.

```Rust

```

TODO: need to clean up code.

For all things Wasm, see the [Marine book](https://fluence.dev/docs/marine-book/introduction) and the Fluence [developer documentation](TBD). Also note, that unless you need some EVM method not currently made available or customize special RPC provider interaction, you may not have to touch this module and the service.


#### Deploying The Service

Even if you don't change the Rust code, you still need to deploy the service to one or more peers to be usable by you dAPP via the gateway. 

#### Distributed Workflow Orchestration With Aqua

soon

#### Bridging P2P and HTTP With The Gateway

soon

### Running fRPC Substrate

soon
