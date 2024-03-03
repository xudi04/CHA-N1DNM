const calcHash = require("./hashMaker");

describe('calcHash()', ()=> {
    it('generate a SHA256', ()=> {
        expect(calcHash("dick")).toEqual("ad505b0be8a49b89273e307106fa42133cbd804456724c5e7635bd953215d92a")
    });
});