import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { admin,farmer,crop,dealer } from '../observables';

@Injectable({
  providedIn: 'root'
})
export class CropServiceService {
  crop:any;

  constructor(private http:HttpClientModule, private client:HttpClient) { }
  error:any;

  head=new HttpHeaders().set('content-type','application/json')
  adminurl="http://localhost:2000/";
  farmerurl="http://localhost:5000/";
  dealerurl="http://localhost:7000/";
  cropurl="http://localhost:8000/";
  invoiceurl="http://localhost:4000/"

//get all crops
    getcrop():Observable<crop[]>{
      const headers={'content-type':'application/json'};
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
    //getting authorized farmer deatils from carmer server
    sendtoken(token:any){
      // console.log(token);
      this.head.set('authorization','Bearer '+token)
      const headers={
        'content-type':'application/json',
        'authorization':'Bearer '+token
    }
      return this.client.get<farmer[]>(this.farmerurl+"farmer",{'headers':headers})
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
    sendtoinvoice(value:Observable<crop[]>):Observable<crop[]>{
      const headers={'content-type':'application/json'};
      const body=JSON.stringify(value)
      console.log(body);
      return this.client.post<crop[]>(this.invoiceurl+'cart',body,{'headers':headers})
      .pipe(
        catchError(this.handleError)
      );
      //return this.crop=value;
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

