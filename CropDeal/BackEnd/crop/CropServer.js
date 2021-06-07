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

const swaggerJsdoc=require("swagger-jsdoc");
const swaggerUi=require("swagger-ui-express");
//swagger 
const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "CROP DEAL CASE STUDY Crop API with Swagger",
        version: "0.1.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
      },
      servers: [
        {
          url: "http://localhost:8000",
        },
      ],
    },
    apis: ["CropServer.js"],
  };
  const specs = swaggerJsdoc(options);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs,{ explorer: true })
  );

 // console.log(specs);

/**
 * @swagger
 * components:
 *   schemas:
 *      Crop:
 *       type: object
 *       required:
 *         - crop_name
 *         - crop_type
 *         - crop_quantity
 *         - crop_price
 *         - location
 *         - crop_img
 *         - uploaded_by
 *       properties:
 *         crop_type:
 *           type: string
 *           description: The crop type
 *         crop_name:
 *           type: string
 *           description: The crop name
 *         crop_quamtity:
 *           type: number
 *           description: quantity
 *         crop_price:
 *           type: number
 *           description: crop price
 *         location:
 *           type: string
 *           description: farmer location
 *         crop_image:
 *           type: string
 *           description: crop image
 *         uploaded_by:
 *           type: string
 *           description: farmer name
 *
 *       example:
 *         - crop_name:"onion"
 *         - crop_type:"vegetable"
 *         - crop_quantity:100
 *         - crop_price:20
 *         - location:object
 *         - crop_img:"http://image"
 *         - uploaded_by :"pradeep"                     
 */

// Api methods

/**
 * @swagger
 * /:
 *   get:
 *    discription: Get all crops
 *    responses:
 *      '200':
 *       description:Success
 *   /ping:
 *     get:
 *       summary: Checks if the server is running
 *       security: []   # No security
 *       responses:
 *         '200':
 *           description: Server is up and running
 *         default:
 *           description: Something is wrong
 */

//getting all data
app.get("/",core.crop_get_all)

/**
 * @swagger
 * /{id}:
 *   get:
 *     summary: edit by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The product description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       404:
 *         description: The product was not found
 */

// fetch particular crop details with name
app.get('/:id',core.crop_get_by_id)

/**
 * @swagger
 * /:
 *   post:
 *     summary: upload crop
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Crop'
 *     responses:
 *       200:
 *         description: crop are uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Crop'
 *       500:
 *         description: Some server error
 */

//adding crop
//app.post("/",upload.single("crop_img"),CheckAuth,core.upload_crop)
 app.post("/",CheckAuth,core.upload_crop) 

/**
 * @swagger
 * /{id}:
 *   put:
 *     summary: edit by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The product description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Crop'
 *       404:
 *         description: The product was not found
 */
 
//updating a particular crop
app.put("/:id",CheckAuth,core.edit_by_id)

/**
 * @swagger
 * /{id}:
 *   delete:
 *     summary: Get the crop by id
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The product id
 *     responses:
 *       200:
 *         description: The product description by id
 *         contens:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       404:
 *         description: The product was not found
 */

//deleteing particular crop
app.delete('/:id',core.delete_by_id)

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

var cropserver=app.listen("8000",()=>console.log("crop server is running on 8000"));

module.exports=cropserver;