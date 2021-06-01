import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CropServiceService } from '../crop-service.service';
import { LoginService } from '../login.service';
import { admin } from '../observables';

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
  
  constructor( private loginserver:LoginService, private router:Router, private cropserver:CropServiceService) { }
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
        const value=this.cropserver.sendtoken(this.token.token)
        //console.log(this.token.token);
        value.subscribe(data=>{
          console.log(data);
        });
        
        
      if(this.form.value.role ==="DEALER"){
          this.router.navigateByUrl("/crop");
      }
      if(this.form.value.role ==="ADMIN"){
        this.router.navigateByUrl("/crop");
    }
      if(this.form.value.role=== "FARMER"){
        this.router.navigateByUrl("/providecrop");
      }
      
    })
  } 
}