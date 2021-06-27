import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopFilterRoutingModule } from './shop-filter-routing.module';
import { ShopFilterComponent } from './shop-filter.component';
import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
 


@NgModule({
  declarations: [ShopFilterComponent],
  imports: [
    CommonModule,
    ShopFilterRoutingModule,
    NgxSliderModule,
    SharedModule,
    PaginationModule,
    FormsModule,
    TranslateModule
  ]
})
export class ShopFilterModule { }
