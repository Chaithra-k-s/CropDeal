import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { farmer } from '../observables';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class FarmerService {
  constructor( private client:HttpClient, private profileservice:ProfileService ) { }
  error:any
  head=new HttpHeaders().set('content-type','application/json');

  farmerurl="http://localhost:5000/farmers";


//edit farmer details
  editfarmer(value:farmer):Observable<farmer[]>{
    const headers={
      'content-type':'application/json',
      'authorization':'Bearer '+this.profileservice.token
  }
      const body=JSON.stringify(value)
      return this.client.put<farmer[]>(this.farmerurl+"/"+value.name,body,{'headers':headers})
        .pipe(
          catchError(this.handleError)
        );
  }

//get farmer details using token
  getfarmer(token?:any):Observable<farmer[]>{ 
    if(token){
      console.log(token);
      let headers={
        'content-type':'application/json',
        'authorization':'Bearer '+token.token
        }
        return this.client.get<farmer[]>(this.farmerurl,{'headers':headers})
        .pipe(
          catchError(this.handleError)
        );
    } else{
      const headers={
        'content-type':'application/json',
        'authorization':'Bearer '+this.profileservice.token
        }
        return this.client.get<farmer[]>(this.farmerurl,{'headers':headers})
        .pipe(
          catchError(this.handleError)
        );
    }   
  }

//get particular farmer details using token
  getfarmerbyid(value:farmer,token:any):Observable<farmer[]>{
    const headers={
      'content-type':'application/json',
      'authorization':'Bearer '+token
      }
  return this.client.get<farmer[]>(this.farmerurl+"/"+this.profileservice._id,{'headers':headers})
    .pipe(
      catchError(this.handleError)
    );
  }

//delete farmer details from database using token
  deletefarmerbyid(value:farmer,token:any):Observable<farmer[]>{
    const headers={
      'content-type':'application/json',
      'authorization':'Bearer '+token
      }
    return this.client.delete<farmer[]>(this.farmerurl+'/'+this.profileservice._id,{'headers':headers})
      .pipe(
        catchError(this.handleError)
      );
  }

//error handling
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
  editcropdetails(value:any){
    const headers={
      'content-type':'application/json',
      'authorization':'Bearer '+this.profileservice.token
  }
      const body=JSON.stringify(value)
      return this.client.patch<farmer[]>(this.farmerurl+"/"+value.name,body,{'headers':headers})
        .pipe(
          catchError(this.handleError)
        );
  }
}
