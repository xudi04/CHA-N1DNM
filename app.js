import express from 'express';
const app = express();

// import {initializeApp} from "firebase/app";
// import { getAuth , createUserWithEmailAndPassword} from "firebase/auth";

// const firebaseConfig = {
//   apiKey: "AIzaSyDGGn29ksaCacveZl6LqRDmZQlABtL05o4",
//   authDomain: "dibistanek.firebaseapp.com",
//   projectId: "dibistanek",
//   storageBucket: "dibistanek.appspot.com",
//   messagingSenderId: "356235836160",
//   appId: "1:356235836160:web:cf570ac2e9aabd1a4251e5"
// };

// // Initialize Firebase
// const App = initializeApp(firebaseConfig);


app.set("view engine", "ejs");
app.use(express.urlencoded({ extended : true}));
app.use(express.static("public"));


app.get("/", (req,res)=>{
    res.render("index", {name:"Dibistanek"});
});


app.get("/profil", (req,res)=>{
    res.render("profil", {name:"Profil"});
});

app.get("/ballance", (req,res)=>{
    res.render("ballance", {name:"ballance"});
});

app.get("/login", (req,res)=>{
    res.render("login", {name:"Login"});
});

app.get("/yz", (req,res)=>{
    res.render("yapay-zeka", {name:"YAPAY ZEKA"});
});


const port = 5000;
app.listen(port, ()=>{
 console.log("started..! (;");
 console.log("http://localhost:"+port);
});