const calcHash = require("./hashMaker");
const hexToBinary = require("hex-to-binary")

class Block {
    constructor({index, data, hash, timestamp, lastHash, nonce, difficulty}){
        this.index = index;
        this.data = data;
        this.timestamp = timestamp;
        this.letsHash = lastHash;
        this.hash = hash;
        this.nonce = nonce;
        this.difficulty = difficulty;
    }

    static genesis(){
        return new this({hash:"genesis", difficulty: "0"});
    }

    static mineBlock({letsBlock, data}){
        var letshash = letsBlock.hash;
        var hash, timestamp;

        var { difficulty } = letsBlock; 
        var nonce = 0;

        do {
            nonce++
            timestamp = Date.now();
            difficulty = 1;
            hash = calcHash(timestamp, hash, difficulty, letshash ,nonce);

        } while (hexToBinary(hash).substring("0", difficulty) !== "0".repeat(difficulty));
        return {
            timestamp,
            letshash,
            data,
            difficulty,
            nonce,
            hash
        }
    }

    static adjustDifficulty({originalBlock, timestamp}){
        var { difficulty } = originalBlock;

        if(difficulty < 1 ) return 1;

        if (timestamp - originalBlock.timestamp > 1000) return difficulty -1;
        return difficulty +1;

    }

    // calculateHash() {
    //     return crypto.createHash("sha256").update(JSON.stringify(this.data), "utf-8").digest("hex");
    // }

}


module.exports = Block;