import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor( private connectserver:LoginService, private router:Router) { }
  ngOnInit(): void {}
  message:any;
  selected="";
  role: string[] = ['ADMIN', 'FARMER', 'DEALER'];
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
      console.log(this.form.value);
      this.connectserver.login(this.form.value).subscribe(data=>{
      console.log(this.form.value); 
      console.log(data);
      this.router.navigateByUrl("/crop")
      this.message="LoggedIn successfully!"
    })
  } 
}