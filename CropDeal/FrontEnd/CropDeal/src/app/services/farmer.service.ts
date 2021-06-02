import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { admin,farmer,dealer } from '../observables';

@Injectable({
  providedIn: 'root'
})
export class FarmerService {
  constructor(private http:HttpClientModule, private client:HttpClient) { }
  error:any

  farmerurl="http://localhost:5000/";

  editfarmer(value:any):Observable<farmer[]>{
      const headers={'content-type':'application/json'};
      const body=JSON.stringify(value)
      return this.client.put<farmer[]>(this.farmerurl+"farmer/"+value.name,body,{'headers':headers})
        .pipe(
          catchError(this.handleError)
        );
  }
  getfarmer(value:any):Observable<farmer[]>{
    const headers={'content-type':'application/json'};
    const body=JSON.stringify(value)
    return this.client.get<farmer[]>(this.farmerurl+"farmer/",{'headers':headers})
      .pipe(
        catchError(this.handleError)
      );
  }
  getfarmerbybyid(value:any):Observable<farmer[]>{
  const headers={'content-type':'application/json'};
  const body=JSON.stringify(value)
  return this.client.get<farmer[]>(this.farmerurl+"farmer/"+value.name,{'headers':headers})
    .pipe(
      catchError(this.handleError)
    );
  }
  deletefarmerbybyid(value:any):Observable<farmer[]>{
    const headers={'content-type':'application/json'};
    const body=JSON.stringify(value)
    return this.client.delete<farmer[]>(this.farmerurl+"farmer/"+value.name,{'headers':headers,'withCredentials':true,})
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
