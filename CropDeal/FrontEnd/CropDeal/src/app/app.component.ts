import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ProfileService } from './services/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router:Router, private profileservice:ProfileService){}
  title = 'CropDeal';

  getdealers(){
    if(!this.profileservice._id.length)
    {
      window.alert("login to get deatils");
      this.router.navigateByUrl("login")
  }else{
    this.router.navigateByUrl("dealers");
  }
    
  }
  registerpage(){
    this.router.navigateByUrl("register");
  }
  loginpage(){
    this.router.navigateByUrl("login");
  }
  cropspage(){
    this.router.navigateByUrl("product");
  }
  cartpage(){
    if(!this.profileservice._id.length)
    {
      window.alert("login to get deatils");
      this.router.navigateByUrl("login");
  }
  else{
    this.router.navigateByUrl("cart");
  }
  }
}
