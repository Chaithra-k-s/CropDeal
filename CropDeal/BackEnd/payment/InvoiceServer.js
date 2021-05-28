//import libraries
const http=require("http");
const express=require("express");
const mongoose=require("mongoose");
const bodyParser=require("body-parser")
const cors=require("cors");
const morgan=require("morgan")
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
mongoose.connect("mongodb+srv://admin:123@mongodbpractise.bjozc.mongodb.net/INVOICE?retryWrites=true&w=majority",
()=>console.log("invoice database connected"));

const invoice=require("./InvoiceSchema");

app.post('/generate',(req,res,next)=>{
    const createinvoice=new invoice({
        _id:new mongoose.Types.ObjectId(),
        crop_name: req.body.crop_name,
        quantity: req.body.quantity,
        selling_price: req.body.selling_price,
        paymentMethod: req.body.paymentMethod,
        total:(req.body.quantity*req.body.selling_price),
        seller: req.body.seller,
        payment_method:{
            card_number : req.body.payment_method.card_number,
            card_type : req.body.payment_method.card_type,
            cvv : req.body.payment_method.cvv
        }
    })
    createinvoice.save().then(result=>{
        console.log(result);
    }).catch(err=>console.log(err))
    res.status(201).json({
        message:"adding invoice details",
        createdadmin:createinvoice
    })
    console.log(req.body);
})

app.put('/edit/:id',(req,res,next)=>{
    invoice.findOneAndUpdate({crop_name:req.params.id},{$set:
        {
        crop_name: req.body.crop_name,
        quantity: req.body.quantity,
        selling_price: req.body.selling_price,
        paymentMethod: req.body.paymentMethod,
        total:(req.body.quantity*req.body.selling_price),
        seller: req.body.seller,
        payment_method:{
            card_number : req.body.payment_method.card_number,
            card_type : req.body.payment_method.card_type,
            cvv : req.body.payment_method.cvv
        }
    }
}).then(result=>{
        console.log(result);
    }).catch(err=>console.log(err))
    res.status(201).json({
        message:"adding invoice details",
        editinvoice: req.body
    })
    console.log(req.body);
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

app.listen("4000",()=>console.log("invoice server is running on 4000"))