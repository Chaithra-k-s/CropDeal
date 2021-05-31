import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { admin,farmer,crop,dealer } from '../observables';

@Injectable({
  providedIn: 'root'
})
export class RegisterService {

  constructor(private http:HttpClientModule, private client:HttpClient) { }
  error:any

    adminurl="http://localhost:2000/";
    farmerurl="http://localhost:5000/";
    dealerurl="http://localhost:7000/"
    cropurl="http://localhost:8000/"

    getcrop():Observable<crop[]>{
      const headers={'content-type':'application/json'};
      //const body=JSON.stringify(value)
        return this.client.get<crop[]>(this.cropurl,{'headers':headers})
        .pipe(
         catchError(this.handleError)
       );
    }
    filtercrop(value:any):Observable<admin[]>{
      const headers={'content-type':'application/json'};
      const body=JSON.stringify(value)
      return this.client.get<admin[]>(this.cropurl+value.crop_name,{'headers':headers})
      .pipe(
        catchError(this.handleError)
      );
    }
    handleError(error:HttpErrorResponse) {
       let errorMessage = '';
       if (error.error instanceof ErrorEvent) {
      //   // client-side error
       errorMessage = `Error: ${error.error.message}`;
       } else {
      //   // server-side error
       errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
       }
       window.alert(errorMessage);
      console.log(errorMessage)
      return throwError(error.message || "Server Error");
    }

}

