const farmerschema=require("./FarmerSchema");
const bodyParser=require("body-parser");
const cors=require("cors");
const bcrypt =require ("bcrypt")
const jwt=require("jsonwebtoken");
const mongoose=require("mongoose");
const { secretKey } = require("./config");

exports.farmers_get_all=(req,res)=>{
    farmerschema.find({}).exec((err,data)=>{
        if(err){
            res.send("error fetching data from database")
        }
        else{
            res.send(data);
        }
    })
}

exports.farmers_get_by_id=(req,res)=>{
    farmerschema.findOne({_id:req.params.id}).exec((err,data)=>{
        if(err){
            res.send("error fetching data from database")
        }
        else{
            res.send(data);
        }
    })
}

exports.farmers_register=(req,res)=>{
    farmerschema.find({email:req.body.email})
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
                    const farmer=new farmerschema({
                        _id:new mongoose.Types.ObjectId(),
                        name:req.body.name,
                        email:req.body.email,
                        contact:req.body.contact,
                        gender:req.body.gender,
                        password:hash,
                    });
                     farmer.save()
                    .then(result=>{
                        res.status(201).json({
                            message:"updated successfully",
                            farmerdetails:result
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

exports.farmers_login=(req,res,next)=>{
    farmerschema.find({email:req.body.email}).exec()
    .then(farmer=>{
        if(farmer.length<1){
            return res.status(401).json({
                message:"user does not exits"
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
                return res.status(200).json({
                    message:"Auth Successful!",
                    token:token,
                    user:farmer[0]
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

exports.farmers_delete_by_id=(req,res)=>{
    farmerschema.findOneAndDelete({_id:req.params.id}).exec((err,data)=>{
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

exports.farmers_edit_by_id=(req,res)=>{
    console.log(req.body);
    bcrypt.hash(req.body.password,10,(err,hash)=>{
        if (err) {
            return res.status(500).json({
                error:err
            })
        }else{
    farmerschema.findOneAndUpdate({_id:req.params.id},{$set:
        {
            name:req.body.name,
            email:req.body.email,
            password:hash,
            contact:req.body.contact,
            gender:req.body.gender,
            cropsgrown:[req.body.crops],
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
            farmerdetails:result
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
    
