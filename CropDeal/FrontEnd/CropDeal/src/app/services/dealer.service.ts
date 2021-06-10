import { Injectable } from '@angular/core';
import { HttpClient, HttpClientModule, HttpErrorResponse,  HttpHeaders } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { dealer } from '../observables';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root'
})

export class DealerService {constructor(private http:HttpClientModule, 
  private client:HttpClient, private profileservice:ProfileService) { }

  error:any
  head=new HttpHeaders().set('content-type','application/json');

  dealerurl="http://localhost:7000/dealers";

  editdealer(value:dealer):Observable<dealer[]>{
    const headers={
      'content-type':'application/json',
      'authorization':'Bearer '+this.profileservice.token
      }
      const body=JSON.stringify(value)
      return this.client.put<dealer[]>(this.dealerurl+"/"+this.profileservice._id,body,{'headers':headers})
      .pipe(
          catchError(this.handleError)
      );
  }

  getdealer(token?:any):Observable<dealer[]>{
    if(token){
      const headers={
        'content-type':'application/json',
        'authorization':'Bearer '+token.token
    }
      return this.client.get<dealer[]>(this.dealerurl,{'headers':headers})
        .pipe(
          catchError(this.handleError)
        );
    }else{
      const headers={
        'content-type':'application/json',
        'authorization':'Bearer '+this.profileservice.token
    }
      return this.client.get<dealer[]>(this.dealerurl,{'headers':headers})
        .pipe(
          catchError(this.handleError)
        );
    }
  }

  getdealerbyid():Observable<dealer[]>{
    const headers={
      'content-type':'application/json',
      'authorization':'Bearer '+this.profileservice.token
  }
  return this.client.get<dealer[]>(this.dealerurl+"/"+this.profileservice._id,{'headers':headers})
    .pipe(
      catchError(this.handleError)
    );
  }

  deletedealerbyid():Observable<dealer[]>{
    const headers={
      'content-type':'application/json',
      'authorization':'Bearer '+this.profileservice.token
  }
    //const body=JSON.stringify(value);
    return this.client.delete<dealer[]>(this.dealerurl+"/"+this.profileservice._id,{'headers':headers })
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