import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FarmerService } from '../services/farmer.service';
import { LoginService } from '../services/login.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-farmer-register',
  templateUrl: './farmer-register.component.html',
  styleUrls: ['./farmer-register.component.css']
})
export class FarmerRegisterComponent implements OnInit {

  constructor( private fb :FormBuilder, private farmerservice:FarmerService,
    private loginservice:LoginService,
    private router:Router,
    private profileservice:ProfileService ) { }
  ngOnInit(): void {
    if(!this.profileservice._id.length){
      console.log(!this.profileservice._id.length);
      this.data=false
    }
  }

  message:any;
  hide = true;
  token:any;
  role: string[] = ['FARMER'];
  submitted=false;
  selected='';
  data=true
  form=this.fb.group({
    name:new FormControl(this.profileservice.name,[Validators.required, Validators.minLength(3)]),
    gender:new FormControl("",[Validators.required, Validators.minLength(3)]),
    contact:new FormControl(1234567890,[Validators.required, Validators.minLength(10),Validators.maxLength(10)]),
    email: new FormControl(this.profileservice.email,[ Validators.required,Validators.email]),
    role:new FormControl(this.selected,Validators.required), 
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
    bank_details:this.fb.group({
      account_number:new FormControl(1234,[Validators.required]),
      bank_name:new FormControl("",[Validators.required]),
      ifsc_code:new FormControl("",[Validators.required])
      })
    })

  //getting formcontrol value
  get f(){
    return this.form.controls
  }

  submit(){
    if(this.form.value.password===this.form.value.confirmpassword){
      this.submitted=true
      this.farmerservice.editfarmer(this.form.value).subscribe(data=>{
      console.log(this.form.value); 
      console.log(data);
      this.message="Edited successfully!"
      window.alert(this.message);
      this.router.navigateByUrl("product")
    })
  }
}
}