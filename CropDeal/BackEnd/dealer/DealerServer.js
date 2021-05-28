//import libraries
const http=require("http");
const express=require("express");
const mongoose=require("mongoose");
const morgan=require("morgan")
const bodyParser=require("body-parser")
const cors=require("cors");
const bcrypt =require ("bcrypt");
const jwt=require("jsonwebtoken")

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
mongoose.connect("mongodb+srv://admin:123@mongodbpractise.bjozc.mongodb.net/DEALER?retryWrites=true&w=majority",
()=>console.log("dealer database connected"));

//importing schema
const dealerschema=require("./DealerSchema");
const { token } = require("morgan");

// Api methods

//getting all data
app.get("/",(req,res)=>{
    dealerschema.find({}).exec((err,data)=>{
        if(err){
            res.send("error fetching data from database")
        }
        else{
            res.send(data);
            console.log(data);
        }
    })
})

// fetch particular details with name
app.get('/:id',(req,res)=>{
    dealerschema.findOne({name:req.params.id}).exec((err,data)=>{
        if(err){
            res.send("error fetching data from database")
        }
        else{
            res.send(data);
            console.log(data);
        }
    })
})


//adding crop
app.post("/",(req,res)=>{
    dealerschema.find({email:req.body.email})
    .exec().then(user=>{
        if(user.length>=1){
            return res.status(409).json({
                message:"MAIL EXITS" 
            })
        }else{
            bcrypt.hash(req.body.password,10,(err,hash)=>{
                if (err) {
                    return res.status(500).json({
                        error:err
                    })
                } else{
                    const dealer=new dealerschema({
                        _id:new mongoose.Types.ObjectId(),
                        name:req.body.name,
                        email:req.body.email,
                        password:hash,
                        subscribed_crops:{
                            crop_name:req.body.subscribed_crops.crop_name,
                            crop_type:req.body.subscribed_crops.crop_type
                        },
                        bank_details:{
                            bank_name:req.body.bank_details.bank_name,
                            account_number:req.body.bank_details.account_number,
                            ifsc_code:req.body.bank_details.ifsc_code
                        }
                    });
                     dealer.save()
                    .then(result=>{
                        res.status(201).json({
                            message:"updated successfully",
                            dealerdetails:result
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
    
// login dealer user

app.post("/login",(req,res,next)=>{
    dealerschema.find({email:req.body.email}).exec()
    .then(dealer=>{
        if(dealer.length<1){
            return res.status(401).json({
                message:"Authentication Failed"
            })
        }
        bcrypt.compare(req.body.password, dealer[0].password,(err,result)=>{
            if(err){
                return res.status(401).json({
                    message:"Authentication failed"
                })
            }
            if (result){
                const token=jwt.sign({
                    email:dealer[0].email,
                    userId:dealer[0]._id
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

//updating a particular crop
app.put("/:id",(req,res)=>{
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if (err) {
            return res.status(500).json({
                error:err
            })
        }else{
    dealerschema.findOneAndUpdate({name:req.params.id},{$set:
        {
            name:req.body.name,
            email:req.body.email,
            password:hash,
            subscribed_crops:{
                crop_name:req.body.subscribed_crops.crop_name,
                crop_type:req.body.subscribed_crops.crop_type
            },
            bank_details:{
                bank_name:req.body.bank_details.bank_name,
                account_number:req.body.bank_details.account_number,
                ifsc_code:req.body.bank_details.ifsc_code
            }
        }
    })
    .then(result=>{
        res.status(201).json({
            message:"updated successfully",
            dealerdetails:result
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
})

//deleteing particular crop
app.delete('/:id',(req,res)=>{
    dealerschema.findOneAndDelete({name:req.params.id}).exec((err,data)=>{
        if(err){
            res.send("error deleting data from database",err)
        }
        else{
            res.send({
                message:"data deleted",
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

app.listen("7000",()=>console.log("dealer server is running on 7000"))