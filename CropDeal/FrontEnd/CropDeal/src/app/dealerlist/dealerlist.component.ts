import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { windowWhen } from 'rxjs/operators';
import { crop, farmer } from '../observables';
import { DealerService } from '../services/dealer.service';
import { FarmerService } from '../services/farmer.service';
import { LoginService } from '../services/login.service';


@Component({
  selector: 'app-dealerlist',
  templateUrl: './dealerlist.component.html',
  styleUrls: ['./dealerlist.component.css']
})
export class DealerlistComponent implements OnInit {
  displayedColumns: string[] = ['name', 'email', 'contact'];//add crops later

  message:any;
  selected="";
  token:any
  role: string[] = ['ADMIN', 'FARMER', 'DEALER'];
  submitted=false;
  dataSource:any;
 
  
  constructor( private loginservice:LoginService,private router:Router,
     private farmerservice:FarmerService,
     private dealerservice:DealerService,) { }
//filter data
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnInit(): void {
    this.submit
  }
 //building form
  form=new FormGroup({
    name:new FormControl("",[Validators.required, Validators.minLength(3)]),
    email: new FormControl("",[ Validators.required,Validators.email]),
    password:new FormControl("",[
      Validators.required,
      Validators.minLength(8),
      Validators.maxLength(12),
      Validators.pattern(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/)
    ]),
    role:new FormControl(this.selected,Validators.required), 
  })
  //getting formcontrol value
  get f(){
    return this.form.controls;
  }
  //actions on form submit
  submit(){
      this.loginservice.login(this.form.value).subscribe(data=>{
        this.message="LogIn successfull!, Please find the Details Below"
        window.alert(this.message);
        this.token=data;
        console.log(this.token);
        this.submitted=true
        if(this.form.value.role===("FARMER" || "ADMIN") ){
          this.farmerservice.getfarmer(this.token.token).subscribe(data=>{
          this.dataSource=data;         
          })
        } 
        if(this.form.value.role ===("DEALER" || "ADMIN")){
          this.dealerservice.getdealer(this.token.token).subscribe(data=>{
          this.dataSource=data;
          })
        }
        if(this.form.value.role ==="ADMIN"){
          this.loginservice.getadmin(this.token.token).subscribe(data=>{
          this.dataSource=data;
        }) 
      }
    })
}
}