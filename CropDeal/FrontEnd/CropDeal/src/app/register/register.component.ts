import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  selected="";
  submitted=false;
  role: string[] = ['ADMIN', 'FARMER', 'DEALER'];
  constructor(private connectserver:LoginService,private router:Router) { }
  ngOnInit(): void {}
  message:any;;
  hide=true
  form=new FormGroup({
    name:new FormControl("",[Validators.required, Validators.minLength(3)]),
    email: new FormControl("",[ Validators.required,Validators.email,
      Validators.pattern(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)]),
    gender:new FormControl("",[Validators.required]),
    contact:new FormControl(1234567890,[Validators.required, Validators.minLength(10),Validators.maxLength(10)]),
    password:new FormControl("",[
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(12),
      Validators.pattern(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    ]),
      confirmpassword:new FormControl("",[
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
    if(this.form.value.password===this.form.value.confirmpassword)
    {
      this.connectserver.register(this.form.value).subscribe(data=>{
      this.message="Registered Successfully!";
      window.alert(this.message)
      this.submitted=true
      this.router.navigateByUrl("/login") 
    })
  }  else {
    this.message="password mismatch!!";
  }
  }
}