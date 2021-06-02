import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CropServiceService} from '../services/crop-service.service';
import { crop } from '../observables';

@Component({
  selector: 'app-cropstore',
  templateUrl: './cropstore.component.html',
  styleUrls: ['./cropstore.component.css']
})
export class CropstoreComponent implements OnInit {

  constructor(private cropservice:CropServiceService, private router:Router) { }
  crops:any;
  type:any
  particularcrop:any

  ngOnInit(): void {
    this.cropservice.getcrop().subscribe(data=>{ 
      this.crops=data;
      console.log(data);
      this.type=typeof(this.crops)
    })
  }

  redirecttofarmer(){
    window.alert("Provide details to Edit Account Details")
    this.router.navigateByUrl("/farmerRegister")
  }
  redirecttodealer(){
    window.alert("Provide details to Edit Account Details")
    this.router.navigateByUrl("/dealerRegister")
  }
  deleteuser(){
    window.alert("Enter ur details to Delete Account")
    this.router.navigateByUrl("/deleteuser")
  }  
  bill(value:any){
    this.cropservice.sendtoinvoice(value).subscribe(data=>{
      console.log(data);
      
    })
    this.router.navigateByUrl("/invoice") 
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
