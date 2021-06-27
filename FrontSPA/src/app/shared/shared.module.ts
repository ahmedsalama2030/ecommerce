 import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as fromComponents from './components';
import * as fromDirective from './directives';
import * as fromPipes from './components/Pipes';
   import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
 import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
   


@NgModule({
  declarations: [
    fromComponents.components,
    fromDirective.directives, 
    fromPipes.pipes],
  imports: [ 
    CommonModule,
    RouterModule,
    TranslateModule,
    BsDropdownModule.forRoot()
    ],
  exports: [fromComponents.components,fromDirective.directives],
  
})
export class SharedModule { }
 