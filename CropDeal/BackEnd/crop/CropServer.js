//import libraries
const http=require("http");
const express=require("express");
const multer=require("multer");
const mongoose=require("mongoose");
const morgan=require("morgan")
const bodyParser=require("body-parser")
const cors=require("cors");
const bcrypt =require ("bcrypt");
const jwt=require("jsonwebtoken");
const cropschema=require("./CropSchema");
//const location=require("./CropSchema")
const core=require("./cropCore");

const app=express();
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(morgan("dev"));

//connecting to database
const dbURI="mongodb+srv://admin:123@mongodbpractise.bjozc.mongodb.net/CROP?retryWrites=true&w=majority";
mongoose.connect(dbURI,{useNewUrlParser:true,
    useUnifiedTopology:true,
    useCreateIndex:true,
    useFindAndModify:true
})
.then(()=>{
    console.log("crop database connected")
})
.catch((err)=>{
    console.log("db connection error:" + err);
});

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

//checking Authorization in middleware
CheckAuth=(req,res,next)=>{
    try{
        if(req.body.role==="ADMIN" || req.body.role==="FARMER"){
            next();
        }
        else{
            res.status(404).json({
                message:"Unauthorized Access"
            })
        }
    } catch(error){
        return res.status(401).json({
            message:"Auth failed in middleware"
        })
    }
}

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

// Api methods

//getting all data
app.get("/",core.crop_get_all)

// fetch particular crop details with name
app.get('/:id',core.crop_get_by_id)

//adding crop
//app.post("/",upload.single("crop_img"),CheckAuth,core.upload_crop)
 app.post("/",CheckAuth,core.upload_crop)   
//updating a particular crop
app.put("/:id",CheckAuth,core.edit_by_id)

//deleteing particular crop
app.delete('/:id',CheckAuth,core.delete_by_id)

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