const mongoose=require("mongoose");
var schema=mongoose.Schema;

var location=new schema({
    Addressline1:String,
    Addressline2:String,
    localArea:String,
    State:String,
    Country:String,
    pincode:Number
})

var cropschema=new schema({
    _id:mongoose.Schema.Types.ObjectId,
    crop_name:{
        type:String,
        required:true,
    },
    crop_type:{
        type:String, 
        required:true
    },
    crop_quantity:{
        type:Number,
        required:true
    },
    location:location,
    crop_img: String,
    uploaded_by:String
})

module.exports=mongoose.model("crop",cropschema);