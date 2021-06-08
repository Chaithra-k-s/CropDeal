import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CropServiceService } from '../services/crop-service.service';
import { LoginService } from '../services/login.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  message:any;
  selected="";
  token:any
  role: string[] = ['ADMIN', 'FARMER', 'DEALER'];
  submitted=false;
  hide=true
  data:any;
  constructor( private loginserver:LoginService, private router:Router, private profileservice:ProfileService) { }
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
      this.loginserver.login(this.form.value).subscribe(data=>{
        this.message="LogIn successfull!"
        window.alert(this.message);
        this.token=data;
        console.log(data);
        this.profileservice.user=data
        this.data=data;
        this.profileservice.token=this.data.token;
        this.profileservice.email=this.data.user.email;
        this.profileservice._id=this.data.user._id;
        this.profileservice.name=this.data.user.name;
        this.profileservice.role=this.data.user.Role;
        this.submitted=true;
        this.router.navigateByUrl("product")             
    })
  } 
}