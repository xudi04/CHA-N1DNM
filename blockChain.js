const Block = require('./block');

class BlockChain {
    constructor(){
        this.chain =[Block.genesis()];
    }

    getLetsBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock(data){
        var letsBlock = this.getLetsBlock();
        console.log(letsBlock.hash);
        var block = Block.mineBlock({ letsBlock: letsBlock, data: data });
        this.chain.push(block);
    }
}

module.exports = BlockChain;