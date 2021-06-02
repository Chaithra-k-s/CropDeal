import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { CropServiceService } from '../services/crop-service.service';

@Component({
  selector: 'app-upload-crop',
  templateUrl: './upload-crop.component.html',
  styleUrls: ['./upload-crop.component.css']
})
export class UploadCropComponent implements OnInit {

  constructor( private fb :FormBuilder,private cropserver:CropServiceService ) { }
  ngOnInit(): void {}
  message:any;
  form=this.fb.group({
    crop_name:new FormControl("",[Validators.required]),
    crop_type: new FormControl("",[ Validators.required]),
    crop_quantity:new FormControl("",[Validators.required]),
    crop_price:new FormControl("",[Validators.required]),
    crop_img:new FormControl("",[Validators.required]),
    uploaded_by:new FormControl("",[Validators.required]),
    location:this.fb.group({
      Addressline1:new FormControl("",[Validators.required]),
      Addressline2:new FormControl(""),
      localArea:new FormControl(""),
      State:new FormControl(""),
      Country:new FormControl(""),
      pincode:new FormControl(123456),
      }),
      role:new FormControl("FARMER" || "ADMIN")
    })

  //getting formcontrol value
  get f(){
    
    return this.form.controls
  }

  submit(){
      console.log(this.form.value);      
      this.cropserver.uploadcrop(this.form.value).subscribe(data=>{
      console.log(this.form.value); 
      console.log(data);
      this.message="submitted successfully!"
    })
  }
}
