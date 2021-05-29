//import libraries
const http=require("http");
const express=require("express");
const mongoose=require("mongoose");
const morgan=require("morgan")
const bodyParser=require("body-parser")
const cors=require("cors");
const bcrypt =require ("bcrypt");
const jwt=require("jsonwebtoken");
const code=require("./dealersCore")

const app=express();
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(morgan("dev"));

//for browsers only
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
    const decoded=jwt.verify(token,"chaithra");
    req.userdata=decoded;
    next();
    } catch(error){
        return res.status(401).json({
            message:"Auth failed in middleware"
        })
    }
}

//connecting to database
mongoose.connect("mongodb+srv://admin:123@mongodbpractise.bjozc.mongodb.net/DEALER?retryWrites=true&w=majority",
()=>console.log("dealer database connected"));

//importing schema
const dealerschema=require("./DealerSchema");

// Api methods

//getting all delaer data
app.get("/dealers",CheckAuth,code.dealers_get_all)

// fetch particular dealer details with name
app.get('/dealers/:id',CheckAuth,code.dealers_get_by_id)


//register new dealer
app.post("/register",code.dealers_register) 
    
// login to existing dealer user
app.post("/login",code.dealers_login)

//editing a particular dealer details
app.put("/dealers/:id",CheckAuth,code.dealers_edit_by_id)

//deleteing particular dealer
app.delete('/dealers/:id',CheckAuth,code.dealers_delete_by_id)

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

app.listen("7000",()=>console.log("dealer server is running on 7000"))