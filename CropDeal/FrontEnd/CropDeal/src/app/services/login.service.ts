import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { admin } from '../observables';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  // public user_id="";
  // public auth_farmer="";
  // public auth_dealer="";
  public auth_admin:any;

  constructor( private client:HttpClient ) {     
  }
 
  error:any;
  head=new HttpHeaders().set('content-type','application/json');

//admin edit is not functioned because only 2 parameters are there in admin 
    adminurl="http://localhost:2000/";
    farmerurl="http://localhost:5000/";
    dealerurl="http://localhost:7000/";


//login exiting user
    login(value:any):Observable<admin[]>{
     console.log(value);
      const headers={'content-type':'application/json'};
      const body=JSON.stringify(value)
      if(value.role==="ADMIN"){
        return this.client.post<admin[]>(this.adminurl+"login",body,{'headers':headers})
        .pipe(
          catchError(this.handleError)
        );
      }
      if(value.role==="FARMER"){
        return this.client.post<admin[]>(this.farmerurl+"login",body,{'headers':headers})
        .pipe(
          catchError(this.handleError)
        );
      }
      if(value.role==="DEALER"){
        return this.client.post<admin[]>(this.dealerurl+"login",body,{'headers':headers})
        .pipe(
          catchError(this.handleError)
        );
      }
      return this.error
    }

//register new user
    register(value:any):Observable<admin[]>{
      const headers={'content-type':'application/json'};
      const body=JSON.stringify(value)
      if(value.role==="ADMIN"){
        return this.client.post<admin[]>(this.adminurl+"register",body,{'headers':headers})
        .pipe(
          catchError(this.handleError)
        );
      }
      if(value.role==="FARMER"){
        return this.client.post<admin[]>(this.farmerurl+"register",body,{'headers':headers})
        .pipe(
          catchError(this.handleError)
        );
      }
      if(value.role==="DEALER"){
        return this.client.post<admin[]>(this.dealerurl+"register",body,{'headers':headers})
        .pipe(
          catchError(this.handleError)
        );
      }return this.error
    }

//handle error
    handleError(error:HttpErrorResponse) {
       let errorMessage = '';
       if (error.error instanceof ErrorEvent) {
         // client-side error
       errorMessage = `Error: ${error.error.message}`;
       } else {
        // server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
       }
       window.alert(errorMessage);
      console.log(errorMessage)
      return throwError(error.message || "Server Error");
    }
}
