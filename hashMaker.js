const crypto = require("crypto");


const calcHash = (...inputs) => {
    var hash = crypto.createHash("sha256");
     
    hash.update(inputs.sort().join(' '));

    return hash.digest("hex");
}

module.exports = calcHash;