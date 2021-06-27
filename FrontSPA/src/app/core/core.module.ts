import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LanguageInterceptorProvidor } from './interceptors/language.interceptor';
import { ErrorInterceptorProvidor } from './interceptors/error.interceptor';
 


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [LanguageInterceptorProvidor,ErrorInterceptorProvidor]
})
export class CoreModule { }
