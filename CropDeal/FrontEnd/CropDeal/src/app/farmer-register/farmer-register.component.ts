import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { FarmerService } from '../services/farmer.service';
import { LoginService } from '../services/login.service';

@Component({
  selector: 'app-farmer-register',
  templateUrl: './farmer-register.component.html',
  styleUrls: ['./farmer-register.component.css']
})
export class FarmerRegisterComponent implements OnInit {

  constructor( private fb :FormBuilder, private farmerservice:FarmerService,
    private loginservice:LoginService ) { }
  ngOnInit(): void {}
  message:any;
  hide = true;
  token:any;
  role: string[] = ['FARMER'];
  submitted=false;
  selected='';
  form=this.fb.group({
    name:new FormControl("",[Validators.required, Validators.minLength(3)]),
    gender:new FormControl("",[Validators.required, Validators.minLength(3)]),
    contact:new FormControl(1234567890,[Validators.required, Validators.minLength(10),Validators.maxLength(10)]),
    email: new FormControl("",[ Validators.required,Validators.email]),
    role:new FormControl(this.selected,Validators.required), 
    password:new FormControl("",[
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(12),
      Validators.pattern(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    ]),
    bank_details:this.fb.group({
      account_number:new FormControl("",[Validators.required]),
      bank_name:new FormControl("",[Validators.required]),
      ifsc_code:new FormControl("",[Validators.required])
      })
    })

  //getting formcontrol value
  get f(){
    return this.form.controls
  }

  submit(){
    console.log(this.form.value);
    this.loginservice.login(this.form.value).subscribe(data=>{
      this.message="LogIn successfull!",
      window.alert(this.message);
      //console.log(this.form.value);
      this.token=data;
      console.log(this.token);
      this.submitted=true
      this.farmerservice.editfarmer(this.form.value,this.token.token).subscribe(data=>{
      //console.log(this.form.value); 
      //console.log(data);
      this.message="submitted successfully!"
    })
  })
  }
}