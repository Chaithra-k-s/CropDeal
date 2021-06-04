import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  public email:String ='';
  public _id:String='';
  public role:String='';
  public name:String='';
  public user:any;
  public token:String='';
  constructor() { }
  
  public get user_details():any {
    return this.user
  }
  public set user_details(value:any){
    this.user=value;
    console.log(this.user);
  }

//set _id
  public get user_id():String {
    return this._id;
  }
  public set user_id(value:String){
    this._id=value; 
  }

//set token
  public get user_token():String {
    return this.token;
  }
  public set user_token(value:String){
    this.token=value; 
  }

//set email
  public get user_email():String {
    return this.email;
  }
  public set user_email(value:String){
    this.email=value; 
  }

//set email
  public get user_name():String {
    return this.email;
  }
  public set user_name(value:String){
    this.email=value; 
  }

//set role
  public get user_role():String {
    return this.role;
  }
  public set user_role(value:String){
    this.role=value; 
  }
 }
