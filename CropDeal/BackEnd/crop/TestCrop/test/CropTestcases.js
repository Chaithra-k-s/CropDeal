const expect =require ("chai").expect;
const request =require("supertest");
const assert =require("chai").assert;

const app=require("../../CropServer");
const conn=require("../DBconnect")

describe ("Testing Crop server routes",()=>{
    before((done)=>{
        conn.connect()
        .then(()=> done())
        .catch((err)=>done(err));
    })
    after((done)=>{
        conn.close()
        .then(()=>done())
        .catch((err)=>done(err));
    })
    it("OK, get all crops Array from database check its not empty",(done)=>{
       request(app)
       .get("/").then(()=>{
           expect(Array).to.contains(Object).not.null;
           done();
       })
       .catch((err)=>{
           done(err)
       })       
    })
    it("OK, Number of elements is not zero",(done)=>{
        request(app)
        .get("/").then((res)=>{
            //expect(Array).to.contains(Object.property("_id"));
            // .to.contain.property("_id");
           // expect(Array).that.contains.deep.members.property([{"_id":String}])
          // expect(res.map(e=>({_id:e._id}))).to.include({"_id":String})
          //const body=res
            //console.log(res);
            expect(res.body).to.contain.keys("0")
            //expect(res).to.be.an("array").to.include({"_id":String})
            expect(res.body).to.have.property("crop_name")
            // .to.contain("_id");
            // expect(Array).to.contains.property("crop_type");
            // expect(Array).to.contains.property("crop_quantity");
            // expect(Array).to.contains.property("crop_price");
            // expect(Array).to.contains.property("crop_location");
            done();
        })
        .catch((err)=>{
            done(err)
        })       
     })
})