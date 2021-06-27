import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShoppingCartRoutingModule } from './shopping-cart-routing.module';
import { ShoppingCartComponent } from './shopping-cart.component';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
 

@NgModule({
  declarations: [ShoppingCartComponent],
  imports: [ 
    CommonModule,
    ShoppingCartRoutingModule,
    PaginationModule,
    FormsModule,
    SharedModule,
    TranslateModule
  ]
})
export class ShoppingCartModule { }
 