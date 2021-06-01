const express=require("express");
const app=express();
const cors=require("cors");
const bodyParser = require("body-parser");
app.use(cors)
app.use(bodyParser.json)

app.post("/auth",(req,res)=>{
    console.log(req.body);
})
app.get("/auth",(req,res)=>{
    res.send("hello")
})
app.listen("8008",()=>{
    console.log("auth server running on 8008");
})