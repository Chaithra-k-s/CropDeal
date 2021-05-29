const mongoose=require("mongoose");
var schema=mongoose.Schema;

var adminschema=new schema({
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
    Role:{
        type:String,
        default:"ADMIN"
    }
})

module.exports=mongoose.model("admin",adminschema);