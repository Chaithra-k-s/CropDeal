import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { admin,farmer,crop,dealer } from './observables';

@Injectable({
  providedIn: 'root'
})
export class CropServiceService {

  constructor(private http:HttpClientModule, private client:HttpClient) { }
  error:any

    adminurl="http://localhost:2000/";
    farmerurl="http://localhost:5000/";
    dealerurl="http://localhost:7000/"
    cropurl="http://localhost:8000/"
//get all crops
    getcrop():Observable<crop[]>{
      const headers={'content-type':'application/json'};
      //const body=JSON.stringify(value)
        return this.client.get<crop[]>(this.cropurl,{'headers':headers})
        .pipe(
         catchError(this.handleError)
       );
    }
    // get particular crop
    filtercrop(value:any):Observable<crop[]>{
      const headers={'content-type':'application/json'};
      const body=JSON.stringify(value)
      return this.client.get<crop[]>(this.cropurl+value.crop_name,{'headers':headers})
      .pipe(
        catchError(this.handleError)
      );
    }
    //post crop
    uploadcrop(value:any):Observable<crop[]>{
      const headers={'content-type':'application/json'};
      const body=JSON.stringify(value)
      return this.client.post<crop[]>(this.cropurl,body,{'headers':headers})
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

