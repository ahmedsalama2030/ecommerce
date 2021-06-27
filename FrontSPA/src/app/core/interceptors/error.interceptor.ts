import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor() { }
 
  intercept(httpRequest: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
     

    return next.handle(httpRequest).pipe(
      catchError(error => {
        if (error instanceof HttpErrorResponse) {
          const applicationError = error.headers.get('Application-Error');
          if (applicationError) {
            return throwError(applicationError);
          } }
        // modelStateError
        const serverError = error.error;
        let modelStateError = '';
        if (serverError && typeof serverError === 'object') {
          for (const key in serverError) {
            if (serverError[key]) { 
              modelStateError += serverError[key] + '\n';
            }
          }
        }
        if (error.status === 401) {
          return throwError(error.error);
             }
             if (error.status === 400) {  
              return throwError(error.error);
              
                 }
         return throwError(modelStateError || serverError || 'server Error');

      })
    )


  }
 }

 export const ErrorInterceptorProvidor={
  provide:HTTP_INTERCEPTORS,
  useClass:ErrorInterceptor,
  multi:true
}