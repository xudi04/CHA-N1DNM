const INITIAL_DIFFICULTY =15;
const MINE_RATE = 1000;

const GENESIS_DATA = {
    timestamp: 1,
    lastHash: "lastHash genesis",
    hash: "hash-genesis",
    difficulty: INITIAL_DIFFICULTY,
    nonce: 0,
    data: []
};

module.exports = { GENESIS_DATA, MINE_RATE };