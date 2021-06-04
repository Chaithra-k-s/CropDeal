import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CropServiceService} from '../services/crop-service.service';
import { crop } from '../observables';
import { InvoiceService } from '../services/invoice.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-cropstore',
  templateUrl: './cropstore.component.html',
  styleUrls: ['./cropstore.component.css']
})
export class CropstoreComponent implements OnInit {

  constructor(private cropservice:CropServiceService, 
    private router:Router, 
    private invoiceservice:InvoiceService, 
    private profileservice:ProfileService) 
    { }

  crops:any
  type:any
  particularcrop:any

  ngOnInit(): void {
    console.log(this.profileservice.user)
    console.log(this.profileservice._id);
    console.log(this.profileservice.email);
    console.log(this.profileservice.token);
    console.log(this.profileservice.name);
  }
  
  redirecttouploadcrop(){
    if(!this.profileservice._id.length){
      window.alert("LOGIN TO UPDATE CROP");
      this.router.navigateByUrl("login")
    }
    else{
      if(this.profileservice.role ==("ADMIN"|| "FARMER")){
      window.alert("LOGIN AS ADMIN OF FARMER TO UPDATE CROP");
      this.router.navigateByUrl("login")
    }
    else{
      window.alert("Provide details to Edit Account Details")
      this.router.navigateByUrl("providecrop")
    }
  }
  }

  redirecttofarmer(){
    if(!this.profileservice._id.length){
      window.alert("LOGIN TO EDIT DETAILS");
      this.router.navigateByUrl("login") 
    }
    else{
      window.alert("Provide details to Edit Account Details")
      this.router.navigateByUrl("/farmerRegister")
    }
  }

  redirecttodealer(){
    if(!this.profileservice._id.length){
      window.alert("LOGIN TO EDIT DETAILS");
      this.router.navigateByUrl("login")  
    }
    else{
      window.alert("Provide details to Edit Account Details")
      this.router.navigateByUrl("/dealerRegister")
    }
  }

  deleteuser(){
    if(!this.profileservice._id.length){
      window.alert("LOGIN TO EDIT DETAILS");
      this.router.navigateByUrl("login") 
    }
    else{
      window.alert("Enter ur details to Delete Account")
      this.router.navigateByUrl("/deleteuser")
    }
  }

  bill(value:any){
    this.cropservice.sendtoinvoice(value).subscribe(data=>{
      this.invoiceservice.cart=data;
      if (this.invoiceservice.cart.length){
        this.router.navigateByUrl("/invoice") ;
      }
      else{
        this.router.navigateByUrl("receipt");
        //this.router.navigateByUrl("C:\nodejs\CropDeal\BackEnd\payment\stripe\checkout.html")
      }
    })
  }

  invoice(value:any){
    this.cropservice.sendtoinvoice(value).subscribe(data=>
      {
      console.log(data); 
    })
    console.log(value);
  }

  cropdetails(value:crop[]){
      this.particularcrop=this.cropservice.filtercrop(value).subscribe(data=>{
        console.log(data)
      })
  }
}
