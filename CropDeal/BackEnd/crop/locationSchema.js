const mongoose=require("mongoose");
var schema=mongoose.Schema;

var location=new schema({
    _id:mongoose.Schema.Types.ObjectId,
    Addressline1:String,
    Addressline2:String,
    localArea:String,
    State:String,
    Country:String,
    pincode:Number
})

module.exports=mongoose.model("location",location);