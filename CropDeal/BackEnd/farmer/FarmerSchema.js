const mongoose=require("mongoose");
var schema=mongoose.Schema;

var bank=new schema({
    account_number : {
        type:Number,
        //required:true
    },
    bank_name : {
        type:String, 
        //required:true
    },
    ifsc_code : String
})

var farmerschema=new schema({
    _id:mongoose.Schema.Types.ObjectId,
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    },
    password:{
        type:String,
        required:true
    },
    contact:Number,
    gender:String,
    cropsgrown:Array,
    bank_details:bank,
    Role:{
        type:String,
        default:"FARMER"
    }
})

module.exports=mongoose.model("farmer",farmerschema);