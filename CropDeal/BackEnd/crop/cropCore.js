const multer=require("multer");
const mongoose=require("mongoose");
const morgan=require("morgan")
const bodyParser=require("body-parser")
const cors=require("cors");
const bcrypt =require ("bcrypt");
const jwt=require("jsonwebtoken");
const cropschema=require("./CropSchema");
const location=require("./locationSchema")

exports.crop_get_all=(req,res)=>{
    cropschema.find({})
    .exec((err,data)=>{
        if(err){
            res.send("error fetching data from database")
        }
        else{
            res.send(data);
        }
    })
}
exports.crop_get_by_id=(req,res)=>{
    cropschema.findOne({crop_name:req.params.id}).exec((err,data)=>{
        if(err){
            res.send("error fetching data from database")
        }
        else{
            res.send(data);
        }
    })
}
exports.upload_crop=(req,res)=>{
    console.log(req.body);
    cropschema.find({crop_name:req.body.crop_name})
    .exec().then(user=>{
            const crop=new cropschema({
                _id:new mongoose.Types.ObjectId(),
                crop_name:req.body.crop_name,
                crop_type:req.body.crop_type,
                crop_quantity:req.body.crop_quantity,
                crop_price:req.body.crop_price,
                location:{
                    Addressline1:req.body.location.Addressline1,
                    Addressline2:req.body.location.Addressline2,
                    localArea:req.body.location.localArea,
                    State:req.body.location.State,
                    Country:req.body.location.Country,
                    pincode:req.body.location.pincode
                },
                crop_img:req.body.crop_img,
               // crop_img:req.file.destination+req.file.originalname,
                uploaded_by:req.body.uploaded_by
            });
            crop.save()
            .then(result=>{
                res.status(201).json({
                    message:"updated successfully",
                    cropdetails:result
                })
            })
            .catch(err=>
                {   
                    console.log(err);
                    res.status(500).json({
                        error:"Crop exits rename it differently"
                    })
                }) 
    })  
}
exports.edit_by_id=(req,res)=>{
    cropschema.findOneAndUpdate({crop_name:req.params.id},{$set:
        {
            crop_name:req.body.crop_name,
            crop_type:req.body.crop_type,
            crop_quantity:req.body.crop_quantity,
            crop_price:req.body.crop_price,
            location:{
                Addressline1:req.body.location.Addressline1,
                Addressline2:req.body.location.Addressline2,
                localArea:req.body.location.localArea,
                State:req.body.location.state,
                Country:req.body.location.Country,
                pincode:req.body.location.pincode
            },
            crop_img:req.body.crop_img,
            uploaded_by:req.body.uploaded_by
        }
    }).exec()
        .then(result=>{
            console.log(result);
            res.status(200).json({
            message:"updating data in database",
            editedcrop:req.body
        })
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error:err
            })
        }
            );
        
}
exports.delete_by_id=(req,res)=>{
    cropschema.findOneAndDelete({crop_name:req.params.id}).exec((err,data)=>{
        if(data==null){
            res.status(404).json({
                error:"Crop not found ",
                message:"error deleting data from database"
            })
        }
        else{
            console.log(typeof(err));
            res.send({
                err:err,
                message:"data deleted",
            })
    }
})
}
