import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { dealer } from '../observables';

@Injectable({
  providedIn: 'root'
})
export class DealerService {
  constructor(private http:HttpClientModule, private client:HttpClient) { }
  error:any

  dealerurl="http://localhost:7000/";

  editdealer(value:any):Observable<dealer[]>{
      const headers={'content-type':'application/json'};
      const body=JSON.stringify(value)
      return this.client.put<dealer[]>(this.dealerurl+"dealer/"+value.name,body,{'headers':headers})
        .pipe(
          catchError(this.handleError)
        );
  }
  getdealer(value:any):Observable<dealer[]>{
    const headers={'content-type':'application/json'};
    const body=JSON.stringify(value)
    return this.client.get<dealer[]>(this.dealerurl+"dealer/",{'headers':headers,'withCredentials':true,})
      .pipe(
        catchError(this.handleError)
      );
  }
  getdealerbybyid(value:any):Observable<dealer[]>{
  const headers={'content-type':'application/json'};
  const body=JSON.stringify(value)
  return this.client.get<dealer[]>(this.dealerurl+"dealer/"+value.name,{'headers':headers})
    .pipe(
      catchError(this.handleError)
    );
  }
  deletedealerbybyid(value:dealer):Observable<dealer[]>{
    const headers={'content-type':'application/json'};
    const body=JSON.stringify(value);
    return this.client.delete<dealer[]>(this.dealerurl+"dealers/"+value.name,{'headers':headers })
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
