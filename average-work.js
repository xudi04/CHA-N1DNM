const BlockChain = require("./blockChain");

const blockchain = new BlockChain();

blockchain.addBlock({data: "hade başlayalım"});

const times = [0];

for (let i = 1; i < 30; i++) {
    const preBlock = blockchain.chain[i - 1];
    const preTime = preBlock.timestamp;

    blockchain.addBlock({data: `Block ${i}`});

    const nextBlock = blockchain.chain[i];
    const nexttime = nextBlock.timestamp;

    var difftime = nexttime - preTime;


    if (i > 1) {
        times.push(difftime);
        const average = times.reduce((total,num) => (total + num)) / times.length;
        console.log(`Block ${i}: Difficuality: ${nextBlock.difficulty} DiffTime: ${difftime}, Average: ${average}`);
    } else {
        console.log(`Block ${i}: Diff Time: ${difftime}ms`);
    }
    
}