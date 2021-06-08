//import libraries
// const http=require("http");
const express=require("express");
const mongoose=require("mongoose");
const morgan=require("morgan")
const bodyParser=require("body-parser")
const cors=require("cors");
// const bcrypt =require ("bcrypt");
const jwt=require("jsonwebtoken");
const code=require("./farmersCore");
// const axios=require("axios");
//importing schema
// const farmerschema=require("./FarmerSchema");
const { secretKey } = require("./config");
// const adminurl="http://localhost:2000/";
// const farmerurl="http://localhost:5000/";
// const dealerurl="http://localhost:7000/";
// const cropurl="http://localhost:8000/"

const checkAuthorization=((req,res,next)=>{
    if(Role==("ADMIN"||"FARMER"))
    {
        next()
    }else{
        res.status(404).json({
            message:"UNAUTHORIZED"
        })
    }
})

const app=express();
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(morgan("dev"));
// axios.get(cropurl)
// .then((response)=>{
//     for(let crop of response.data){
//         console.log(crop.crop_name);
//     }
// }).catch(console.error)

// axios.get(adminurl)
// .then((response)=>{
//     for(let data of response.data){
//         console.log(data);
//     }
// }).catch(console.error)

//for browsers only setting headers
app.use((req,res,next)=>{
    res.header("Access-Control-Allow-Origin",'*');
    res.header("Access-Control-Allow-Headers",
    'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({})
    }
    next();
})

//checking Authorization in middleware
const CheckAuth=(req,res,next)=>{    
    try{
        const token =req.headers.authorization.split(" ")[1];
        console.log(token);
        const decoded=jwt.verify(token,secretKey);
        req.userdata=decoded;
        next();
    } catch(error){
        return res.status(401).json({
            message:"UNAUTHORISED!",
            error:error
        })
    }
}

//connecting to database
const dbURI="mongodb+srv://admin:123@mongodbpractise.bjozc.mongodb.net/FARMER?retryWrites=true&w=majority";
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
.then(()=>{
    console.log("farmer database connected")
}).catch((err)=>{
    console.log("db connection error:" + err);
});

// Api Endpoints
//getting all data
app.get("/farmers",CheckAuth,code.farmers_get_all)

// fetch particular farmer details with name
app.get('/farmers/:id',CheckAuth,code.farmers_get_by_id);

// login dealer user
app.post("/login",code.farmers_login);

//registering new farmer details
app.post("/register",code.farmers_register)  

//updating a particular crop
app.put("/farmers/:id",CheckAuth,code.farmers_edit_by_id)

//deleteing particular crop
app.delete('/farmers/:id',CheckAuth,code.farmers_delete_by_id)

//handing server errors
app.use((req,res,next)=>{
    const error=new Error("Not found");
    error.status=404;
    next(error);
})

app.use((error,req,res,next)=>{
    res.status(error.status || 500);
    res.json({
        error:{
            message:error.message
        }
    })
})

// get calls from server
var farmer=app.listen("5000",()=>console.log("farmer server is running on 5000"))

module.exports=farmer