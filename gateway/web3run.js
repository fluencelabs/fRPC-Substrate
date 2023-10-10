import Web3 from 'web3';

const web3 = new Web3("http://localhost:3000");

async function main() {
    try {
        console.log("Trying to fetch the block number...");
        const bn = await web3.eth.getBlockNumber();
        console.log("Block number is: ", bn);
    } catch (e) {
        console.error("Error requesting block number\n", e);
    }

    try {
        console.log("Trying to fetch the transaction information...");
        const resp = await web3.eth.getTransaction("0x7bfa7c9812c67af61872c66f3af13bb65ad0f81b7a44bcf4a11c11900be16409");
        console.log("Transaction is", resp);
    } catch (e) {
        console.log("Error requesting transaction info!\n", e)
    }
}

main();
