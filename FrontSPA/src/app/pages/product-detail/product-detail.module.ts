import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductDetailRoutingModule } from './product-detail-routing.module';
import { ProductDetailComponent } from './product-detail.component';
import { GallaryComponent } from './gallary/gallary.component';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { HttpClientModule } from '@angular/common/http';
 import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';


@NgModule({
  declarations: [ProductDetailComponent, GallaryComponent],
  imports: [
    CommonModule,
    ProductDetailRoutingModule,
    NgxGalleryModule,
    HttpClientModule,
    SharedModule,
    TranslateModule
  ]
})
export class ProductDetailModule { }
