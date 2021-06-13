// const stripe = require('stripe')('sk_test_4eC39HqLyjWDarjtT1zdp7dc');
// const express = require('express');
// const app = express();
// app.use(express.static('.'));

// var bodyParser=require('body-parser');
// app.use(bodyParser.urlencoded({extended:true}));
// app.use(bodyParser.json());
// var cors=require('cors');
// const originWhitelist=[
//     'http://localhost:4200'
// ];
// app.use((req,res,next)=>{
//   console.log(req);
//   res.header("Access-Control-Allow-Origin",'*');
//   res.header("Access-Control-Allow-Headers",
//   'Origin,X-Requested-With,Content-Type,Accept,Authorization');
//   if(req.method === 'OPTIONS'){
//       res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
//       return res.status(200).json({})
//   }
//   next();
// })
// var corsOptions={
//     origin:function(origin,callback){
//       console.log(origin);
//         var isWhitelisted=this.originWhitelist.indexOf(origin) !=-1;
//         callback(null,isWhitelisted);
//     },
//     //credentials:true
// }
// app.use(cors(corsOptions));

// app.use(cors())

// const YOUR_DOMAIN = 'http://localhost:4200';

// app.post('/paynow', async (req, res) => {
//   const session = await stripe.checkout.sessions.create({
//     payment_method_types: ['card'],
//     line_items: [
//       {
//         price_data: {
//           currency: 'inr',
//           product_data: {
//             name: 'Stubborn Attachments',
//             images: ['https://i.imgur.com/EHyR2nP.png'],
//           },
//           unit_amount: 2000,
//         },
//         quantity: 1,
//       },
//     ],
//     mode: 'payment',
//     success_url: `${YOUR_DOMAIN}/success.html`,
//     cancel_url: `${YOUR_DOMAIN}/cancel.html`,
//   });

//   res.json({ id: session.id });
// });

// app.listen(4242, () => console.log('Running on port 4242'));

var express=require('express');
var stripe=require('stripe') ('sk_test_51IyUGPSFBbuL0qrEWrir3GegnQ3I8SkWN61ENtnnpiSWykMPu9eMU4YijSpnon0Oe3ZildCeQtDMvqN3S1IINay500iAHGFdWN');
var app=express();
var bodyParser=require('body-parser');
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
var cors=require('cors');
var originWhitelist=[
    'http://localhost:4200'
];
var corsOptions={
    origin:function(origin,callback){
        var isWhitelisted=this.originsWhitelist
        // .indexOf(origin);
        callback(null,isWhitelisted);
    },
    //credentials:true
}

app.use((req,res,next)=>{
    console.log(req);
    res.header("Access-Control-Allow-Origin",'*');
    res.header("Access-Control-Allow-Headers",
    'Origin,X-Requested-With,Content-Type,Accept,Authorization');
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods','PUT,POST,PATCH,DELETE,GET');
        return res.status(200).json({})
    }
    next();
  })
 app.use(cors(corsOptions));
  app.post('/paynow',(req,res)=>{
    console.log('The body is',req.body);
    var charge=stripe.charges.create({
        amount:req.body.amount,
        currency:'INR',
        source:req.body.token
    },(err,charge)=>{
        if(err){
            throw err;
        }
        res.json({
            success:true,
            message:"Payment done"
        })
    });
})

app.listen(4242,()=>{
    console.log('server starts at port 4242');
});