//import libraries
const express=require("express");
const mongoose=require("mongoose");
const morgan=require("morgan")
const bodyParser=require("body-parser")
const cors=require("cors");
const bcrypt =require ("bcrypt");
const jwt=require("jsonwebtoken");
const core=require("./adminCore");
const axios=require("axios");

const { secretKey } = require("./config");

const app=express();
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(morgan("dev"));

const swaggerJsdoc=require("swagger-jsdoc");
const swaggerUi=require("swagger-ui-express");
//swagger 
const options = {
    definition: {
      openapi: "3.0.0",
      info: {
        title: "CROP DEAL CASE STUDY Admin API with Swagger",
        version: "0.1.0",
        description:
          "This is a simple CRUD API application made with Express and documented with Swagger",
      },
      servers: [
        {
          url: "http://localhost:2000",
        },
      ],
    },
    apis: ["AdminServer.js"],
  };
 //require("../../BackEnd/crop/CropServer")
  const specs = swaggerJsdoc(options);
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(specs,{ explorer: true })
  );

  console.log(specs);

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

/**
 * @swagger
 * components:
 *   schemas:
 *      Admin:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - password
 *         - contact
 *         - gender
 *       properties:
 *         id:
 *           type: string
 *           description: The auto-generated id of the User
 *         name:
 *           type: string
 *           description: The admin name
 *         contact:
 *           type: number
 *           description: contact number
 *         gender:
 *           type: string
 *           description: gender of addmin
 *         password:
 *           type: string
 *           description: password of admin
 *
 *       example:
 *         id: 1254gfg645
 *         name: TestAdmin
 *         email : "Abcd12@email.com"
 *         password: "Test@123"
 *         gender: "MALE"
 *         contact: 1234567869
 */

//checking Authorization in middleware
const CheckAuth=(req,res,next)=>{
    try{
        const token =req.headers.authorization.split(" ")[1];
        console.log(token);
        const decoded=jwt.verify(token,secretKey);
        req.userdata=decoded;
    next();
    } catch(error){
        return res.status(401).json({
            message:"Auth failed in middleware",
        })
    }
}

//connecting to database
const dbURI="mongodb+srv://admin:123@mongodbpractise.bjozc.mongodb.net/CropdealADMIN?retryWrites=true&w=majority";
mongoose.connect(dbURI,{useNewUrlParser:true,useUnifiedTopology:true,useCreateIndex:true})
.then(()=>{
    console.log("admin database connected")
})
.catch((err)=>{
    console.log("db connection error:" + err);
});
/**
 * @swagger
 * /admin:
 *   get:
 *    discription: Get admin with check_auth
 *    parameters:
 *      - name: 
 *        description: name
 *        required: true
 *        type: String
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
//get all details
app.get("/admin",CheckAuth,core.get_admins);

//get admin by id
app.get("/admin/:id",CheckAuth,core.get_admin_by_id)

/**
 * @swagger
 * /login:
 *   post:
 *    discription: login admin
 *    components:
 *      securitySchemes:
 *        BearerAuth:
 *          type: http
 *          scheme: bearer
 *    parameters:
 *      - name: 
 *        description: name
 *        required: true
 *        type: String
 *      - email: 
 *        description: email
 *        required: true
 *        type: String
 *      - password: 
 *        description: password
 *        required: true
 *        type: String
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

// login dealer user
app.post("/login",core.admin_login);

/**
 * @swagger
 * /register:
 *   post:
 *     summary: register a new admin
 *     tags: [Product]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Admin'
 *     responses:
 *       200:
 *         description: The ADMIN was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Admin'
 *       500:
 *         description: Some server error
 */

 //register new dealer
app.post('/register',core.admin_register);

 //edit admin deatils
app.put("/:id",CheckAuth,core.admin_edit_by_id);


//delete admin details
app.delete("/:id",CheckAuth,core.admin_delete_by_id)

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

var adminserver=app.listen("2000",()=>console.log("admin server is running on 2000"));

module.exports=adminserver
 
//401-unauthorised
//500 server down
//402 register error or mongoose error