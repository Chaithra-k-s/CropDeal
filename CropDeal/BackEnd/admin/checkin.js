const express=require("express");
const app=express();

app.get("/",(req,res)=>{
    res.send("hello")
})

app.get("/",(req,res)=>{
    res.send("hello")
})

app.listen("6000",()=>console.log("admin server is running on 6000"))
