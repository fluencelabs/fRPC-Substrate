import Web3 from 'web3';

const web3 = new Web3("http://localhost:3000");

async function main() {
    const bn = await web3.eth.getBlockNumber()
    console.log(bn)

    const resp = await web3.eth.getTransaction("0x538d389383f069cce103a2aad905815dbff1dce88eeef07a3e8f2d4348a6353e")
    console.log(resp)
}

main();

