const express = require('express');
const BlockChain = require('./blockChain');
const bodyParser = require("body-parser");

app = express();

var bc = new BlockChain();

app.use(bodyParser.json());

app.get("/blocks", (req,res) => {
    res.json(bc.chain);
});

app.post("/add", (req,res) => {
    const { data } = req.body;
    bc.addBlock(req.body );

    res.redirect("/blocks");
});

app.listen(process.env.PORT,3000, () =>{
    console.log("http//localhost:3000");
});
