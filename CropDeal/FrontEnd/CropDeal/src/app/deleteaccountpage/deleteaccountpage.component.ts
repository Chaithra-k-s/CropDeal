import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../services/admin.service';
import { DealerService } from '../services/dealer.service';
import { FarmerService } from '../services/farmer.service';
import { LoginService } from '../services/login.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-deleteaccountpage',
  templateUrl: './deleteaccountpage.component.html',
  styleUrls: ['./deleteaccountpage.component.css']
})
export class DeleteaccountpageComponent implements OnInit {
  data=true
  message:any;
  selected="";
  token:any;
  hide=true;
  role: string[] = ['ADMIN', 'FARMER', 'DEALER'];
  submitted=false
  
  constructor( private farmerservice:FarmerService, private router:Router,
     private dealerservice:DealerService, private adminservice:AdminService,
     private loginservice:LoginService, private profileservice:ProfileService) { }
  ngOnInit(): void {
    if(!this.profileservice._id.length){
      console.log(!this.profileservice._id.length);
      this.data=false
    }
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
      this.message="Validation successfull!",
      window.alert(this.message);
      this.token=data;
      this.submitted=true
      this.submitted=true
      if(this.form.value.role ==="DEALER"){
        this.dealerservice.deletedealerbyid().subscribe(data=>{
          this.message="deleted successfull!"
          window.alert(this.message);
          document.location.reload()
          this.router.navigateByUrl("")
        })
      }
      if(this.form.value.role ==="ADMIN"){
        this.adminservice.deleteadminbyid(this.token.token).subscribe(()=>{
          this.message="deleted successfull!"
          window.alert(this.message);
          document.location.reload()
          this.router.navigateByUrl("")
        })
    }
      if(this.form.value.role==="FARMER"){
        this.farmerservice.deletefarmerbyid(this.form.value,this.token.token).subscribe(data=>{
          this.message="deleted successfull!"
          window.alert(this.message);
          document.location.reload()
          this.router.navigateByUrl("")
        })
      }
    })
  }
  } 