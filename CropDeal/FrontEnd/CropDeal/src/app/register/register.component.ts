import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(
     private connectserver:LoginService
    ) { }
  ngOnInit(): void {}
  message:any;
  form=new FormGroup({
    name:new FormControl("",[Validators.required, Validators.minLength(3)]),
    email: new FormControl("",[ Validators.required,Validators.email]),
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
    role:new FormControl("")
  })

  //getting formcontrol value
  get f(){
    return this.form.controls;
  }

  submit(){
    if(this.form.value.password===this.form.value.confirmpassword)
    {
      console.log(this.form.value);
      
    this.connectserver.registerdealer(this.form.value).subscribe(data=>{
    console.log(this.form.value); 
    console.log(data);
     this.message="submitted successfully!"
    })
  }  else {
    this.message="password mismatch!!";
  }
  }
}