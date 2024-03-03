const Blockchain = require('./blockChain');
const Block = require('./block');
const calcHash = require('./hashMaker');


describe("BlockChain", ()=> {
    var blockchain, newChain, orginalChain = new Blockchain();

    beforeEach(()=> {
        blockchain = new Blockchain();
        newChain = new Blockchain();
        orginalChain = blockchain.chain;
    });

     
     it("blockchain.chain is array",()=>{
        expect(blockchain.chain instanceof Array).toBe(true);
    });

    it("begin with genesis", ()=>{
        expect(blockchain.chain[0]).toEqual(Block.genesis());
    });

    it("add Block", ()=>{
        let newData = "new Block";
        blockchain.addBlock({data: newData});

        expect(blockchain.chain[blockchain.chain.length - 1].data).toEqual(newData);
    });

    describe("isValideChain", ()=> {
        describe("dont strat width genesis", ()=>{
            it("retorn false", ()=> {
                blockchain.chain[0] = {data : "booooom"};
                expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
            });
        });

        describe("chain, genesis ve diğer bloklarla başladı", ()=>{
            beforeEach(()=> {
                blockchain.addBlock({data: "para"});
                blockchain.addBlock({data: "zaman"});
                blockchain.addBlock({data: "bilgi"});
            });
            
            describe("latsHash changed", ()=>{
                it("retorn false", ()=> {
                    blockchain.chain[2].latsHash = "booooom";
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });

            describe("difficuality jumped", ()=>{
                it("retorn false", ()=> {
                    var latsBlock = blockchain.chain[blockchain.chain.length - 1];
                    var latsHash = latsBlock.hash;
                    var data = [];
                    var timestamp = Date.now();
                    var nonce = 0;
                    var difficulty = latsHash.difficulty - 3;

                    var hash = calcHash(data, timestamp, latsHash, nonce, difficulty);

                    const badBlock = new Block({data, hash, timestamp, latsHash, nonce, difficulty});

                    blockchain.chain.push(badBlock);
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });

            describe("geçersiz alana shaip blok varsa", ()=>{
                it("retorn false", ()=> {
                    blockchain.chain[2].data = "mustafa";
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });

            describe("dont have any prablem", ()=>{
                it("retorn true", ()=> {
                    expect(Blockchain.isValidChain(blockchain.chain)).toBe(false);
                });
            });
        });
    });

    describe("replacechain", ()=>{
        let errorMock, logMock;
        beforeEach(() => {
            errorMock = jest.fn();
            logMock = jest.fn();

            global.console.error = errorMock;
            global.console.log = logMock;
        });

        describe("when new chai bether short", ()=>{
            beforeEach(()=>{
                newChain.chain[0] = {new: "chain"};
                blockchain.replaceChain(newChain.chain);
            });
            it("change chain", ()=> {
                expect(blockchain.chain).toEqual(orginalChain);
            });
            it('logs an error', () => {
                expect(errorMock).toHaveBeenCalled();
            });
        });


        describe("when new chai bether long", ()=>{
            beforeEach(()=>{
                newChain.addBlock({new: "tekrar"});
                newChain.addBlock({new: "bidaha"});
                newChain.addBlock({new: "ekle"});
            });
            it("change hash", ()=> {
                newChain.chain[1].hash = "hesh is changed";
                blockchain.replaceChain(newChain.chain);
                expect(blockchain.chain).toEqual(orginalChain);
            });
        });
    });

    describe("and the chain is valid", ()=>{
        beforeEach(()=>{
            blockchain.replaceChain(newChain.chain);

        });
        it("start replace", ()=> {
            
            expect(blockchain.chain).toEqual(orginalChain);
        });
    });

});
