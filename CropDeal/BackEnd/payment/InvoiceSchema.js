const mongoose=require("mongoose");
const schema=mongoose.Schema;

var payment=new schema({
    card_number : Number,
    card_type : String,
    cvv : Number
})

var invoiceschema=new schema({
    _id:mongoose.Schema.Types.ObjectId,
    crop_name: String,
    quantity: Number,
    selling_price: Number,
    date: Date,
    paymentMethod: String,
    total: Number,
    seller: Object,
    payment_method:payment
})

module.exports=mongoose.model("invoice",invoiceschema);