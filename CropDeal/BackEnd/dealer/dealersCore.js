const dealerschema=require("./DealerSchema");
const bodyParser=require("body-parser");
const cors=require("cors");
const bcrypt =require ("bcrypt")
const jwt=require("jsonwebtoken");
const mongoose=require("mongoose");
const { secretKey } = require("./config");

exports.dealers_get_all=(req,res)=>{
    dealerschema.find({}).exec((err,data)=>{
        if(err){
            res.send("error fetching data from database")
        }
        else{
            res.send(data);
        }
    })
}

exports.dealers_get_by_id=(req,res)=>{
    dealerschema.findOne({name:req.params.id}).exec((err,data)=>{
        if(err){
            res.send("error fetching data from database")
        }
        else{
            res.send(data);
            console.log(data);
        }
    })
}

exports.dealers_register=(req,res)=>{
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
                        conatct:req.body.contact,
                        gender:req.body.gender
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
}

exports.dealers_login=(req,res,next)=>{
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
                },secretKey,{
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
}

exports.dealers_edit_by_id=(req,res)=>{
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
            contact:req.body.contact,
            gender:req.body.gender,
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
}

exports.dealers_delete_by_id=(req,res)=>{
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
}
