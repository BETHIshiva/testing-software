import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
    HttpResponse,
    HttpErrorResponse,
    HttpHeaders
   } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
   export class HttpErrorInterceptor implements HttpInterceptor {
     constructor(private router:Router){}
    //  public authReq;
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

      request=request.clone({
        setHeaders: {'Content-Type': 'application/x-www-form-urlencoded'}});
      return next.handle(request)
        .pipe(
          //retry(1),
          catchError((error: HttpErrorResponse) => {
            let errorMessage = '';
            if (error.error instanceof ErrorEvent) {
              // client-side error
              errorMessage = `Error: ${error.error.message}`;
            } else {
              // server-side error
              errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
            }
            console.log(errorMessage);
           return throwError(errorMessage);
          })
        )
    }
   }
