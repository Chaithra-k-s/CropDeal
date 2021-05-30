import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
//import { ProfileServiceService } from '../profile-service.service';

@Component({
  selector: 'app-dealer-register',
  templateUrl: './dealer-register.component.html',
  styleUrls: ['./dealer-register.component.css']
})
export class DealerRegisterComponent implements OnInit {

  constructor(private fb :FormBuilder
    // private connectserver:ProfileServiceService
    ) { }
  ngOnInit(): void {}
  message:any;
  form=this.fb.group({
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
    subscribed_crops:this.fb.group({
      crop_name:new FormControl("",[Validators.required]),
      crop_type:new FormControl("",[Validators.required]),
      }),
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
    if(this.form.value.password===this.form.value.confirmpassword)
    {
      console.log(this.form.value);
      
    // this.connectserver.postadmin(this.form.value).subscribe(data=>{
    //   console.log(this.form.value); 
    //   console.log(data);
    //   this.message="submitted successfully!"
    //})
  }  else {
    this.message="password mismatch!!";
  }
  }
}
