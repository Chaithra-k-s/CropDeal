import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DealerService } from '../services/dealer.service';
import { FarmerService } from '../services/farmer.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-deleteaccountpage',
  templateUrl: './deleteaccountpage.component.html',
  styleUrls: ['./deleteaccountpage.component.css']
})
export class DeleteaccountpageComponent implements OnInit {

  message:any;
  selected="";
  token:any;
  hide=true;
  role: string[] = ['ADMIN', 'FARMER', 'DEALER'];
  submitted=false
  
  constructor( private farmerservice:FarmerService, private router:Router,
     private dealerservice:DealerService, private adminservice:LoginService,
     private loginservice:LoginService) { }
  ngOnInit(): void {
  }
 
  form=new FormGroup({
    name:new FormControl("",[Validators.required, Validators.minLength(3)]),
    email: new FormControl("",[ Validators.required,Validators.email]),
    password:new FormControl("",[
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(12),
      Validators.pattern(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    ]),
    role:new FormControl(this.selected,Validators.required), 
  })
  //getting formcontrol value
  get f(){
    return this.form.controls;
  }

  submit(){
    this.loginservice.login(this.form.value).subscribe(data=>{
      this.message="LogIn successfull!",
      window.alert(this.message);
      //console.log(this.form.value);
      this.token=data;
      //console.log(this.token);
      this.submitted=true
      this.submitted=true
      if(this.form.value.role ==="DEALER"){
        this.dealerservice.deletedealerbyid(this.form.value,this.token).subscribe(data=>{
          this.message="deleted successfull!"
          window.alert(this.message);
          this.router.navigateByUrl("")
        })
      }
      if(this.form.value.role ==="ADMIN"){
        this.adminservice.deleteadminbyid(this.form.value,this.token).subscribe(data=>{
          this.message="deleted successfull!"
          window.alert(this.message);
          this.router.navigateByUrl("")
        })
    }
      if(this.form.value.role==="FARMER"){
        this.farmerservice.deletefarmerbyid(this.form.value,this.token).subscribe(data=>{
          this.message="deleted successfull!"
          window.alert(this.message);
          this.router.navigateByUrl("")
        })
      }
    })
  }
  } 