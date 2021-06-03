import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse,  HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { dealer } from '../observables';

@Injectable({
  providedIn: 'root'
})

export class DealerService {constructor(private http:HttpClientModule, private client:HttpClient) { }
  error:any
  head=new HttpHeaders().set('content-type','application/json');

  dealerurl="http://localhost:7000/dealers";

  editdealer(value:dealer,token:any):Observable<dealer[]>{
    const headers={
      'content-type':'application/json',
      'authorization':'Bearer '+token
  }
      const body=JSON.stringify(value)
      return this.client.put<dealer[]>(this.dealerurl+'/'+value.name,body,{'headers':headers})
        .pipe(
          catchError(this.handleError)
        );
  }

  getdealer(token:any):Observable<dealer[]>{
    const headers={
      'content-type':'application/json',
      'authorization':'Bearer '+token
  }
    return this.client.get<dealer[]>(this.dealerurl,{'headers':headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  getdealerbyid(value:dealer,token:any):Observable<dealer[]>{
    const headers={
      'content-type':'application/json',
      'authorization':'Bearer '+token
  }
  return this.client.get<dealer[]>(this.dealerurl+"/"+value.name,{'headers':headers})
    .pipe(
      catchError(this.handleError)
    );
  }

  deletedealerbyid(value:dealer,token:any):Observable<dealer[]>{
    const headers={
      'content-type':'application/json',
      'authorization':'Bearer '+token
  }
    const body=JSON.stringify(value);
    return this.client.delete<dealer[]>(this.dealerurl+"/"+value.name,{'headers':headers })
      .pipe(
        catchError(this.handleError)
      );
  }
  
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