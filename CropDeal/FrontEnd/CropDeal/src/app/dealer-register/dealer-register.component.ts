import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { DealerService } from '../services/dealer.service';
import { LoginService } from '../services/login.service';
import { ProfileService } from '../services/profile.service';
//import { ProfileServiceService } from '../profile-service.service';

@Component({
  selector: 'app-dealer-register',
  templateUrl: './dealer-register.component.html',
  styleUrls: ['./dealer-register.component.css']
})
export class DealerRegisterComponent implements OnInit {

  constructor(private fb :FormBuilder, 
    private dealerservice:DealerService,
    private loginservice:LoginService,
    private profileservice:ProfileService
    ) { }
  ngOnInit(): void {
    if(!this.profileservice._id.length){
      console.log(!this.profileservice._id.length);
      this.data=false
    }
  }
  message:any;
  hide = true;
  token:any;
  submitted=false;
  selected='';
  data=true;

  form=this.fb.group({
    gender:new FormControl("",[Validators.required, Validators.minLength(3)]),
    contact:new FormControl(1234567890,[Validators.required, Validators.minLength(10),Validators.maxLength(10)]),
    name:new FormControl(this.profileservice.name,[Validators.required, Validators.minLength(3)]),
    email: new FormControl(this.profileservice.email,[ Validators.required,Validators.email]),
    role:new FormControl(this.selected,Validators.required), 
    password:new FormControl("",[
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
    role: string[] = ['DEALER'];
  //getting formcontrol value
  get f(){
    return this.form.controls
  }

  submit(){
    //console.log(this.form.value);
      this.submitted=true
      this.dealerservice.editdealer(this.form.value).subscribe(data=>{
      //console.log(this.form.value); 
      //console.log(data);
      this.message="submitted successfully!"
    })
  }
}
