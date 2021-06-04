import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { admin } from '../observables';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  error:any;

  adminurl="http://localhost:2000/";

  constructor( private client:HttpClient, private profileservice:ProfileService ) { }
//get all admin 
  getadmin():Observable<admin[]>{
    console.log(this.profileservice.user);
    {
    const headers={
      'content-type':'application/json',
      'authorization':'Bearer '+this.profileservice.token
  }
    return this.client.get<admin[]>(this.adminurl+"admin",{'headers':headers})
  }
}

//get admin by id
  getadminbyid():Observable<admin[]>{
    const headers={
      'content-type':'application/json',
      'authorization':'Bearer '+this.profileservice.token
  }
    return this.client.get<admin[]>(this.adminurl+"admin"+this.profileservice._id,{'headers':headers})
  }

//delete admin
  deleteadminbyid(token:any):any{
    const headers={
      'content-type':'application/json',
      'authorization':'Bearer '+token
  }
    return this.client.delete<admin[]>(this.adminurl+this.profileservice._id,{'headers':headers})
  .pipe(
    catchError(this.handleError)
  );
  }

//edit admin
  editadminbyid(value:admin):Observable<admin[]>{
  const headers={
  'content-type':'application/json',
  'authorization':'Bearer '+this.profileservice.token
}
const body=JSON.stringify(value)
return this.client.put<admin[]>(this.adminurl+'/'+value.name,body,{'headers':headers})
.pipe(
catchError(this.handleError)
);
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
