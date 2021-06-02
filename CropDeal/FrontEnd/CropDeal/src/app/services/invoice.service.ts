import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { admin,farmer,crop,dealer } from '../observables';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private client:HttpClient) { }

  invoiceurl="http://localhost:4000/";

  getCartItems():Observable<crop[]>{
    const headers={'content-type':'application/json'};
    return this.client.get<crop[]>(this.invoiceurl+'cartitems',{'headers':headers})
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteCart():Observable<crop[]>{
    const headers={'content-type':'application/json'};
    return this.client.get<crop[]>(this.invoiceurl+'deleteitems',{'headers':headers})
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteCartItem(value:any):Observable<crop[]>{
    const headers={'content-type':'application/json'};
    return this.client.get<crop[]>(this.invoiceurl+'deleteitem/'+value,{'headers':headers})
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
