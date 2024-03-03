const calcHash = require("./hashMaker");
const hexToBinary = require("hex-to-binary");
const {GENESIS_DATA, MINE_RATE} = require("./config");

class Block {
    constructor({index, data, hash, timestamp, latsHash, nonce, difficulty}){
        this.index = index;
        this.data = data;
        this.timestamp = timestamp;
        this.latsHash = latsHash;
        this.hash = hash;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }

    static genesis(){
        return new this(GENESIS_DATA);
    }

    static mineBlock(latsBlock, data ){
        var latsHash = latsBlock.hash;
        var hash, timestamp;

        var { difficulty } = latsBlock; 
        var nonce = 0;

        do {
            nonce++
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty({originalBlock: latsBlock, timestamp});
            hash = calcHash(timestamp, data, difficulty, latsHash ,nonce);

        } while (hexToBinary(hash).substring("0", difficulty) !== "0".repeat(difficulty));
        return new this({
            index:1,
            data,
            hash,
            timestamp,
            latsHash,
            nonce,
            difficulty
        });
    }

    static adjustDifficulty({originalBlock, timestamp}){
        var { difficulty } = originalBlock;

        if(difficulty < 1 ) return 1;

        if (timestamp - originalBlock.timestamp > 1000) return difficulty -1;
        return difficulty +3;

    }

    // calculateHash() {
    //     return crypto.createHash("sha256").update(JSON.stringify(this.data), "utf-8").digest("hex");
    // }

}


module.exports = Block;