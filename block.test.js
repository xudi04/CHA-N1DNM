const hexToBinary = require("hex-to-binary");
const Block = require("./block");
const { GENESİS_DATA, MINE_RATE } = require("./config");
const calcHash = require("./hashMaker");


describe("Block", ()=> {

    const timestamp = 2000;
    const lastHash = "lasthash";
    const hash = "hash";
    const data = ["blockchain", "data"];
    const nonce = 1;
    const difficulty = 1;

    const block = new Block({
        timestamp: timestamp,
        lastHash: lastHash,
        hash: hash,
        data: data,
        nonce,
        difficulty
    });

    it("onaylamak", ()=> {
        expect(block.timestamp).toEqual(timestamp);
        expect(block.hash).toEqual(hash);
        expect(block.nonce).toEqual(nonce);
        expect(block.difficulty).toEqual(difficulty);
    });

    describe("genesis()", ()=> {
        const genesisBlock = Block.genesis();
        it("instanceof", ()=> {
            expect(genesisBlock instanceof Block).toEqual(true);
        });

        it("return genesis data ", ()=> {
            expect(genesisBlock.Block).toEqual(GENESİS_DATA);
        });
    });


    //blokmu,lasthash doğrumu , data doğrumu, time doğrumu, hash doğrumu
    describe("mineBlock()", ()=> {
        const lastBlock = Block.genesis();
        const data = "Mustafa";
        const mineBlock = Block.mineBlock(lastBlock, data);


        it("instanceof", ()=> {
            expect(mineBlock instanceof Block).toEqual(true);
        });

        it("lasthash", ()=> {
            expect(mineBlock.latsHash).toEqual(lastBlock.hash);   
        });

        it("data", ()=> {
            expect(mineBlock.data).toEqual(data);
        });

        it("timestamp", ()=> {
            expect(mineBlock.timestamp).not.toEqual(undefined);
        });

        it("data", ()=> {
            expect(mineBlock.hash)
                .toEqual(
                    calcHash(
                        mineBlock.timestamp,
                        mineBlock.nonce,
                        mineBlock.difficulty,
                        lastBlock.hash,
                        data
                    )
                );
        });
    });
});