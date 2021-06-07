const adminschema=require("./AdminSchema");
const bodyParser=require("body-parser");
const cors=require("cors");
const bcrypt =require ("bcrypt")
const jwt=require("jsonwebtoken");
const mongoose=require("mongoose");
const axios=require("axios");
const { secretKey } = require("./config");
const farmerurl="http://localhost:5000/";
const dealerurl="http://localhost:7000/"
const cropurl="http://localhost:8000/";

//all admins
exports.get_admins=(req,res,next)=>{
    adminschema.find({}).exec((err,data)=>{
        if(err){
            res.send("error fetching data from database")
        }
        else{
            res.send(data);
        }
    })
}

//get admin by id
exports.get_admin_by_id=(req,res,next)=>{
    adminschema.findOne({_id:req.params.id}).exec((err,data)=>{
        if(err){
            res.send("error fetching data from database")
        }
        else{
            res.send(data);
        }
    })  
}
//register admin
exports.admin_register=(req,res,next)=>{
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
                        gender:req.body.gender,
                        contact:req.body.contact,
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
}

//logim admin
exports.admin_login=(req,res,next)=>{
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
            if (result && req.body.role === "ADMIN"){
                const token=jwt.sign({
                    email:admin[0].email,
                    userId:admin[0]._id
                },secretKey,
                {
                    expiresIn:'1h'
                })
                return res.status(200).json({
                    message:"Auth Successful!",
                    token:token,
                    user:admin[0]
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

//edit admin details
exports.admin_edit_by_id=(req,res)=>{
    console.log(req.body);
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if (err) {
            return res.status(500).json({
                error:err
            })
        }else{
    adminschema.findOneAndUpdate({_id:req.params.id},{$set:
        {
            name:req.body.name,
            email:req.body.email,
            password:hash,
            contact:req.body.contact,
            gender:req.body.gender
        }
    })
    .then(result=>{
        res.status(201).json({
            message:"updated successfully",
            admindetails:result
        })
    })
        .catch(err=>{
            console.log(err),
            res.status(402).json({
                message:"INVALID EMAIL ID",
                ERROR:"INVALID EMAIL ID"
            })
        })
    }
})
}

//delete admin details
exports.admin_delete_by_id=(req,res)=>{
    adminschema.findOneAndDelete({_id:req.params.id}).exec((err,data)=>{
        if(err){
            res.send("error deleting data from database",err)
        }
        else{
            res.send({
                message:"data deleted",
            })
    }
})
}