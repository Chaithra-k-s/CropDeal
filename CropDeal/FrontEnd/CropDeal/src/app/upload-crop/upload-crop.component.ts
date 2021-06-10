import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CropServiceService } from '../services/crop-service.service';
import { FarmerService } from '../services/farmer.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-upload-crop',
  templateUrl: './upload-crop.component.html',
  styleUrls: ['./upload-crop.component.css']
})
export class UploadCropComponent implements OnInit {
data=true
name:String[]=[]
type:String[]=[]
  constructor( private fb :FormBuilder,
    private cropserver:CropServiceService,
    private router:Router,
    private profileservice:ProfileService,
    private farmerservice:FarmerService,
    ){ }

  ngOnInit(): void {
    this.cropserver.getcrop().subscribe(data=>{
      console.log(data);
      for(let i of data)
      {
        this.name.push(i.crop_name);
        this.type.push(i.crop_type);
      }    
    })
    this.data=!this.profileservice._id.length  
  }
  message:any;
  form=this.fb.group({
    crop_name:new FormControl("",[Validators.required]),
    crop_type: new FormControl("",[ Validators.required]),
    crop_quantity:new FormControl("",[Validators.required]),
    crop_price:new FormControl(0,[Validators.required]),
    crop_img:new FormControl("",[Validators.required]),
    uploaded_by:new FormControl(this.profileservice.name),
    location:this.fb.group({
      Addressline1:new FormControl("",[Validators.required]),
      Addressline2:new FormControl(""),
      localArea:new FormControl(""),
      State:new FormControl(""),
      Country:new FormControl(""),
      pincode:new FormControl(123),
      }),
      role:new FormControl("FARMER")
    })

  //getting formcontrol value
  get f(){
    return this.form.controls
  }

  submit(){    
      this.cropserver.uploadcrop(this.form.value).subscribe(data=>{
      this.message="submitted successfully!"
      this.farmerservice.editcropdetails(this.form.value)
      this.router.navigateByUrl('product');
    })
  }
}
