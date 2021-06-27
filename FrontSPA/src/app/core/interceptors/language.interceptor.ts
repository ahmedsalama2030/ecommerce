import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class LanguageInterceptor implements HttpInterceptor {

  constructor() {}
  lang:string='';
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    this.lang= localStorage.getItem('lang')?.toString()! || 'en';

     const languageRequest = request.clone({ headers: request.headers.append('Accept-Language',this.lang )});

    return next.handle(languageRequest);
  }
} 

export const LanguageInterceptorProvidor={
  provide:HTTP_INTERCEPTORS,
  useClass:LanguageInterceptor,
  multi:true
}