//import libraries
const http=require("http");
const express=require("express");
const mongoose=require("mongoose");
const morgan=require("morgan")
const bodyParser=require("body-parser")
const cors=require("cors");
const bcrypt =require ("bcrypt");
const jwt=require("jsonwebtoken");
const code=require("./farmersCore");
const axios=require("axios");
//importing schema
const farmerschema=require("./FarmerSchema");
const { secretKey } = require("./config");
const adminurl="http://localhost:2000/";
const farmerurl="http://localhost:5000/";
const dealerurl="http://localhost:7000/";
const cropurl="http://localhost:8000/"

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
    {
        farmerschema.find({email:req.body.email}).exec()
        .then(farmer=>{
            if(farmer.length<1){
                return res.status(401).json({
                    message:"Authentication Failed"
                })
            }
            bcrypt.compare(req.body.password, farmer[0].password,(err,result)=>{
                if(err){
                    return res.status(401).json({
                        message:"Authentication failed"
                    })
                }
                if (result){
                    const token=jwt.sign({
                        email:farmer[0].email,
                        userId:farmer[0]._id
                    },secretKey,{
                        expiresIn:'1h'
                    })
                    next()
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
    }    
//     try{
//         if(req.body.role==="ADMIN" || req.body.role==="FARMER")
//         {
//             console.log(req.body.role);
//             const token =req.headers.authorization.split(" ")[1];
//             console.log(token);
//             const decoded=jwt.verify(token,secretKey);
//             req.userdata=decoded;
//     next();
//  }
//     } catch(error){
//         return res.status(401).json({
//             message:"UNAUTHORISED!",
//             error:error
//         })
//     }
}

//connecting to database
const dbURI="mongodb+srv://admin:123@mongodbpractise.bjozc.mongodb.net/FARMER?retryWrites=true&w=majority";
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
.then(()=>{
    console.log("farmer database connected")
})
.catch((err)=>{
    console.log("db connection error:" + err);
});

// Api Endpoints
//getting all data
app.get("/farmer",code.farmers_get_all)

// fetch particular farmer details with name
app.get('/farmer/:id',code.farmers_get_by_id);

// login dealer user
app.post("/login",code.farmers_login);

//registering new farmer details
app.post("/register",code.farmers_register)  

//updating a particular crop
app.put("/farmer/:id",code.farmers_edit_by_id)

//deleteing particular crop
app.delete('/farmer/:id',code.farmers_delete_by_id)

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

app.listen("5000",()=>console.log("farmer server is running on 5000"))