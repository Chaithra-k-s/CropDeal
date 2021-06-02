import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private router:Router){}
  title = 'CropDeal';
  getfarmers(){
    window.alert("Re-login to get deatils")
    this.router.navigateByUrl("farmers");
  }
  getdealers(){
    window.alert("Re-login to get deatils");
    this.router.navigateByUrl("dealers");
  }
}
