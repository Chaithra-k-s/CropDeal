import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-complete',
  templateUrl: './complete.component.html',
  styleUrls: ['./complete.component.css']
})
export class CompleteComponent implements OnInit {
show=true;
  constructor(private router:Router) { }
  goback(){
    this.router.navigateByUrl("product")
  }
  ngOnInit(): void {
    this.submit
    // console.log(this.show);
    
  }
  submit(){
    this.show=false
    // console.log(this.show);
    
  }
 
}
