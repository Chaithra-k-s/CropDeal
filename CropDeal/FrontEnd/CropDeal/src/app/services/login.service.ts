import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { admin,farmer,dealer } from '../observables';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http:HttpClientModule, private client:HttpClient) { }
  error:any

    adminurl="http://localhost:2000/";
    farmerurl="http://localhost:5000/";
    dealerurl="http://localhost:7000/"

    login(value:any):Observable<admin[]>{
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
//     editfarmer(value:any):Observable<farmer[]>{
//         const headers={'content-type':'application/json'};
//         const body=JSON.stringify(value)
//         return this.client.post<farmer[]>(this.farmerurl+"farmer/"+value.name,body,{'headers':headers})
//           .pipe(
//             catchError(this.handleError)
//           );
//     }
//     getfarmer(value:any):Observable<farmer[]>{
//       const headers={'content-type':'application/json'};
//       const body=JSON.stringify(value)
//       return this.client.get<farmer[]>(this.farmerurl+"farmer/",{'headers':headers,'withCredentials':true,})
//         .pipe(
//           catchError(this.handleError)
//         );
//   }
//   getfarmerbybyid(value:any):Observable<farmer[]>{
//     const headers={'content-type':'application/json'};
//     const body=JSON.stringify(value)
//     return this.client.get<farmer[]>(this.farmerurl+"farmer/"+value.name,{'headers':headers,'withCredentials':true,})
//       .pipe(
//         catchError(this.handleError)
//       );
// }
  deleteadminbybyid(value:any):Observable<admin[]>{
  const headers={'content-type':'application/json'};
  const body=JSON.stringify(value)
  return this.client.delete<admin[]>(this.adminurl+value.name,{'headers':headers})
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
