//import libraries
const http=require("http");
const express=require("express");
const mongoose=require("mongoose");
const morgan=require("morgan")
const bodyParser=require("body-parser")
const cors=require("cors");
const bcrypt =require ("bcrypt");
const jwt=require("jsonwebtoken");
const core=require("./adminCore")

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
const dbURI="mongodb+srv://admin:123@mongodbpractise.bjozc.mongodb.net/CropdealADMIN?retryWrites=true&w=majority";
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
.then(()=>{
    console.log("admin database connected")
})
.catch((err)=>{
    console.log("db connection error:" + err);
});

//importing schema
const adminschema=require("./AdminSchema");

// login dealer user
app.post("/login",core.admin_login);

//register new dealer
app.post('/register',core.admin_register);

//edit admin deatils
app.put("/:id",CheckAuth,core.admin_edit_by_id);

//delete admin details
app.delete("/:id",CheckAuth,core.admin_delete_by_id)

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

app.listen("6000",()=>console.log("admin server is running on 6000"))