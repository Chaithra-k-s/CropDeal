//import libraries
const http=require("http");
const express=require("express");
const multer=require("multer");
const mongoose=require("mongoose");
const morgan=require("morgan")
const bodyParser=require("body-parser")
const cors=require("cors");
const bcrypt =require ("bcrypt");
const jwt=require("jsonwebtoken")
const app=express();

//connecting to database
mongoose.connect("mongodb+srv://admin:123@mongodbpractise.bjozc.mongodb.net/CROP?retryWrites=true&w=majority",
()=>console.log("crop database connected"));

app.use('/uploads',express.static('uploads'));

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
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(morgan("dev"));

const Storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"./uploads/")
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
})
const filefilter=(req,file,cb)=>{
    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true)
    }
    else {
        cb(new Error("Doesnot support type"),false)
    }
}
const upload=multer({storage:Storage,limits:{
    fileSize:1024*1024*5
}})
//const upload=multer({dest:"./uploads/"});
//importing schema
const cropschema=require("./CropSchema");

// Api methods

//getting all data
app.get("/",(req,res)=>{
    cropschema.find({}).exec((err,data)=>{
        if(err){
            res.send("error fetching data from database")
        }
        else{
            res.send(data);
            console.log(data);
        }
    })
})

// fetch particular crop details with name
app.get('/:id',(req,res)=>{
    cropschema.findOne({crop_name:req.params.id}).exec((err,data)=>{
        if(err){
            res.send("error fetching data from database")
        }
        else{
            res.send(data);
            console.log(data);
        }
    })
})

//adding crop
app.post("/",upload.single("crop_img"),(req,res)=>{
    cropschema.find({crop_name:req.body.crop_name})
    .exec().then(user=>{
            const crop=new cropschema({
                _id:new mongoose.Types.ObjectId(),
                crop_name:req.body.crop_name,
                crop_type:req.body.crop_type,
                crop_quantity:req.body.crop_quantity,
                location:{
                    Adressline1:req.body.location.Adressline1,
                    Adressline1:req.body.location.Adressline1,
                    localArea:req.body.location.localArea,
                    State:req.body.location.State,
                    Country:req.body.location.Country,
                    pincode:req.body.location.pincode
                },
                crop_img:req.file.destination+req.file.originalname,
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
                        error:err
                    })
                }) 
    })  
})
    

//updating a particular crop
app.put("/:id",upload.single("crop_img"),(req,res)=>{
    cropschema.findOneAndUpdate({crop_name:req.params.id},{$set:
        {
            crop_name:req.body.crop_name,
            crop_type:req.body.crop_type,
            crop_quantity:req.body.crop_quantity,
            location:{
                Adressline1:req.body.location.Adressline1,
                Adressline1:req.body.location.Adressline1,
                localArea:req.body.location.localArea,
                State:req.body.location.state,
                Country:req.body.location.Country,
                pincode:req.body.location.pincode
            },
            crop_img:req.file.destination+req.file.originalname,
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
        
})

//deleteing particular crop
app.delete('/:id',(req,res)=>{
    cropschema.findOneAndDelete({crop_name:req.params.id}).exec((err,data)=>{
        if(err){
            res.send("error deleting data from database",err)
        }
        else{
            res.send({
                message:"data deleted",
            })
    }
})
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
app.listen("8000",()=>console.log("crop server is running on 8000"))