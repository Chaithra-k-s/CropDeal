const expect =require ("chai").expect;
const request =require("supertest");
const assert =require("chai").assert;
const app=require("./AdminServer");
const conn=require("./DBconnect");
let token="";
let id=""
// register, login, edit, get alladmins, admin by id finally delete user
describe("POST /register ",()=>{
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
    describe("error status code",()=>{
        it("exiting user should give 409 status code",(done)=>{
            const response =request(app).post("/register")
            .send({
                name:"Chaithra KS",
                email:"kschaithra21@gmail.com",
                password:"Chai@210396",
                role:"ADMIN",
                contact:1234567891,
                gender:"FEMALE"
            }).then(response=>{
                expect(response.statusCode).to.be.equal(409);              
                done()
            })
            .catch((err)=>{
                //console.log(err);
                done(err);
                throw(err);
            })  
        })
        it("should give 409 status code for missing role value",(done)=>{
            const response =request(app).post("/register")
            .send({
                name:"Chaithra KS",
                email:"kschaithra21@gmail.com",
                password:"Chai@210396",
                contact:1234567891,
                gender:"FEMALE"
            }).then(response=>{
                expect(response.statusCode).to.be.equal(409);              
                done()
            })
            .catch((err)=>{
                //console.log(err);
                done(err);
                throw(err);
            })  
        })
        it("should give 409 status code for missing password value",(done)=>{
            const response =request(app).post("/register")
            .send({
                name:"Chaithra KS",
                email:"kschaithra21@gmail.com",
                role:"ADMIN",
                contact:1234567891,
                gender:"FEMALE"
            }).then(response=>{
                expect(response.statusCode).to.be.equal(409);              
                done()
            })
            .catch((err)=>{
               // console.log(err);
                done(err);
                throw(err);
            })  
        })
        it("should give 402 status code for missing email value",(done)=>{
            const response =request(app).post("/register")
            .send({
                name:"Chaithra KS",
                role:"ADMIN",
                password:"Chai@210396",
                contact:1234567891,
                gender:"FEMALE"
            }).then(response=>{
                expect(response.statusCode).to.be.equal(402);              
                done()
            })
            .catch((err)=>{
                //console.log(err);
                done(err);
                throw(err);
            })  
        })
        it("should give 402 status code for invalid email value",(done)=>{
            const response =request(app).post("/register")
            .send({
                name:"Chaithra KS",
                role:"ADMIN",
                email:"email.com",
                password:"Chai@210396",
                contact:1234567891,
                gender:"FEMALE"
            }).then(response=>{
                expect(response.statusCode).to.be.equal(402);              
                done()
            })
            .catch((err)=>{
                //console.log(err);
                done(err);
                throw(err);
            })  
        })
        it("should give 402 status code for role email value",(done)=>{
            const response =request(app).post("/register")
            .send({
                email:"Testingabc@123.com",
                role:"ADMIN",
                password:"Chai@210396",
                contact:1234567891,
                gender:"FEMALE"
            }).then(response=>{
                expect(response.statusCode).to.be.equal(402);              
                done()
            })
            .catch((err)=>{
                //console.log(err);
                done(err);
                throw(err);
            })  
        })

     })
     describe("new user and role should give 201 status code",()=>{
        it("create new user should give 201 status code",(done)=>{
            request(app).post("/register")
            .send({
                name:"Chaithra",
                email:"Testabc12@gmail.com",
                password:"Chai@210396",
                role:"ADMIN",
                contact:1234567891,
                gender:"FEMALE"
            }).then(response=>{
                expect(response.statusCode).to.be.equal(201);
                expect(response.body.admin).to.contain.property("_id");           
                done()
            }).catch((err)=>{
                //console.log(err);
                done(err);
                throw(err);
            }) 
        })

        it("login to get token of newly created user",done=>{
            request(app).post("/login")
            .send({
                name:"Chaithra",
                email:"Testabc12@gmail.com",
                password:"Chai@210396",
                role:"ADMIN",
            }).then(response=>{
                //console.log(response.body);
                expect(response.statusCode).to.be.equal(200);
                this.token=response.body.token; 
                this.id=response.body.user._id             
                done()
            })
            .catch((err)=>{
                // console.log(err);
                done(err);
                throw(err);
            }) 
        })

        it("get all admin details auth shd return with 200 code",(done)=>{
            request(app).get("/admin")
            .set({"authorization":"Bearer "+this.token})
            .then((res)=>{
                expect(res.statusCode).to.be.equal(200); 
                done();
            })
            .catch((err)=>{
                done(err)
            })
        })

        it("edit new user details should give 201 status code",(done)=>{
            console.log(this.id);
            request(app).put("/"+this.id)
            .set({"authorization":"Bearer "+this.token})
            .send({
                name:"Chaitra",
                email:"Testabc12@gmail.com",
                password:"Chai@210396",
                role:"ADMIN",
                contact:1234567891,
                gender:"FEMALE",
            }).then(response=>{
                expect(response.statusCode).to.be.equal(201);
                // expect(response.body.admin).to.contain.property("_id");           
                done()
            }).catch((err)=>{
                console.log(err);
                done(err);
                throw(err);
            }) 
        })

        it("get particular admin details auth shd return with 200 code",(done)=>{
            headers=({"authorization":"Bearer "+this.token})
            request(app).get("/admin/"+this.id)
            .set({"authorization":"Bearer "+this.token})
            .then((res)=>{
                expect(res.statusCode).to.be.equal(200); 
                done();
            })
            .catch((err)=>{
                done(err)
                throw(err)
            })
        })

        it("created user deletion",done=>{
                request(app).delete("/"+this.id)
                .set({"authorization":"Bearer "+this.token})
                .then(value=>{
                expect(value.statusCode).to.be.equal(200)
                done()
            })
            .catch((err)=>{
                console.log(err);
                done(err);
                throw(err);
            })  
        })
     })

})

//only login
describe("POST/login",()=>{
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

    describe("given user name which does not exists ",()=>{
       it("should give 401 status code",(done)=>{
            const response = request(app).post("/login")
            .send({
                name:"chaithra",
                email:"kschaithra21@gmail.com",
                password:"Chai"
            }).then(response=>{
                expect(response.statusCode).to.be.equal(401);               
                done()
            })
            .catch((err)=>{
                console.log(err);
                throw(err);
            })  
        });

    })
    describe("when the username and password is missing/mismatch",()=>{
        it("missing password should give 401 status code",(done)=>{
                const response =request(app).post("/login")
                .send({
                    name:"chaithra",
                    email:"kschaithra21@gmail.com",
                    password:""
                }).then(response=>{
                    expect(response.statusCode).to.be.equal(401);                
                    done()
                })
                .catch((err)=>{
                    console.log(err);
                    throw(err);
                }) 
         })

         describe("mismatch email should give 401 status code",()=>{
            it("should give 401 status code",(done)=>{
                const response =request(app).post("/login")
                .send({
                    name:"chaithra",
                    email:"kschaithra@21@gmail.com",
                    password:"Chai@"
                }).then(response=>{
                    expect(response.statusCode).to.be.equal(401);                
                    done()
                })
                .catch((err)=>{
                    console.log(err);
                    throw(err);
                })  
            })
     
         })

    }) 
    describe("when the username and password is provided properly",()=>{
         describe("exiting user and role should give 200 status code",()=>{
            it("should give 200 status code",(done)=>{
                const response =request(app).post("/login")
                .send({
                    name:"Chaithra KS",
                    email:"kschaithra21@gmail.com",
                    password:"Chai@210396",
                    role:"ADMIN"
                }).then(response=>{
                    expect(response.statusCode).to.be.equal(200);
                    this.token=response.body.token               
                    done()
                })
                .catch((err)=>{
                    console.log(err);
                    done(err);
                    throw(err);
                })  
            })
     
         })

    }) 
})
//
describe("GET /admin to get all admin details",()=>{
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
    it("get admin details without auth shd return error with status code",(done)=>{
        request(app)
        .get("/admin")
        .then((res)=>{
            expect(res.statusCode).to.be.equal(401); 
            done();
        })
        .catch((err)=>{
            done(err)
        })
    })
    //get token from previous test case
    it("get admin details auth shd return with 200 code",(done)=>{
        //console.log(this.token);
        headers=({"authorization":"Bearer "+this.token})
        request(app).get("/admin")
        .set({"authorization":"Bearer "+this.token})
        .then((res)=>{
            //console.log(res.body);
            expect(res.statusCode).to.be.equal(200); 
            done();
        })
        .catch((err)=>{
            done(err)
        })
    })
})




