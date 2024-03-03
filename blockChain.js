const Block = require('./block');
const calcHash = require("./hashMaker");

class BlockChain {
    constructor(){
        this.chain =[Block.genesis()];
    }

    getLetsBlock(){
        return this.chain[this.chain.length - 1];
    }

    addBlock({data}){
        var letsBlock = this.getLetsBlock();
        var block = Block.mineBlock(letsBlock, data);
        this.chain.push(block);
    }

    replaceChain(chain){
        if (chain.length <= this.chain.length) {
            console.error("chain daha uzun olmalı");

            return;
        }

        if (!BlockChain.isValidChain(chain)) {
            console.error("gelen chain geçerli değil");
            return;
        }
        console.error("chain is changed -> ", chain);
        this.chain = chain;
    }

    static isValidChain(chain){
        if (JSON.stringify(chain[0]) != JSON.stringify(Block.genesis())) return false;

        for (let i = 1; i < chain.length; i++) {
            const { timestamp, latsHash, hash, data, nonce, difficulty } = chain[i];

            const latsDifficuality = chain[i - 1].difficulty;

            const latshashR = chain[i - 1].hash;
            if(latsHash != latshashR) return false;

            const hashR = calcHash(timestamp, latsHash, hash, data, nonce, difficulty);
            if(hash != hashR) return false;

            if(Math.abs(difficulty - latsDifficuality) > 1) return false;
            
        }
        
        return true;
    }
}

module.exports = BlockChain;