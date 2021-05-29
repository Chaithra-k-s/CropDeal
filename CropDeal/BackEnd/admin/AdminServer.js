//import libraries
const http=require("http");
const express=require("express");
const mongoose=require("mongoose");
const morgan=require("morgan")
const bodyParser=require("body-parser")
const cors=require("cors");
const bcrypt =require ("bcrypt");

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

//connecting to database
mongoose.connect("mongodb+srv://admin:123@mongodbpractise.bjozc.mongodb.net/CropdealADMIN?retryWrites=true&w=majority",
()=>console.log("admin database connected"));

//importing schema
const adminschema=require("./AdminSchema");

// login dealer user

app.post("/login",(req,res,next)=>{
    adminschema.find({email:req.body.email}).exec()
    .then(admin=>{
        if(admin.length<1){
            return res.status(401).json({
                message:"Authentication Failed"
            })
        }
        bcrypt.compare(req.body.password, admin[0].password,(err,result)=>{
            if(err){
                return res.status(401).json({
                    message:"Authentication failed"
                })
            }
            if (result){
                const token=jwt.sign({
                    email:admin[0].email,
                    userId:admin[0]._id
                },"chaithra",{
                    expiresIn:'1h'
                })
                return res.status(200).json({
                    message:"Auth Successful!",
                    token:token
                })
            }
            res.status(401).json({
                message:"Authentication failed"
            })
        })
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err,
            message:err
        })
    })
})


//api
app.post('/signup',(req,res,next)=>{
    adminschema.find({email:req.body.email})
    .exec().then(user=>{
        if(user.length>=1){
            return res.status(409).json({
                message:"MAIL EXITS/USER EXITS" 
            })
        }else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if (err) {
                    return res.status(500).json({
                        error:err
                    })
                } else{
                    const createdadmin=new adminschema({
                        _id:new mongoose.Types.ObjectId(),
                        name:req.body.name,
                        email:req.body.email,
                        password: hash
                    })
                    createdadmin.save()
                    .then(result=>{
                        res.status(201).json({
                            message:"adding admin details",
                            admin:result 
                        })
                    })
                    .catch(err=>{
                        console.log(err),
                        res.status(402).json({
                            message:"INVALID EMAIL ID",
                            ERROR:err._message
                        })
                    })
                }
            })
        }
    })  
})

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