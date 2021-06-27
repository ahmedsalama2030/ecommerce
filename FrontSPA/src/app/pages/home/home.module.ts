  import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
 import { BestSellerComponent } from './best-seller/best-seller.component';
 import { TopCategoryComponent } from './top-category/top-category.component';
import { LatestBlogComponent } from '../../shared/components/latest-blog/latest-blog.component';
 import { MainCarouselComponent } from './main-carousel/main-carousel.component';
 import { HomeComponent } from './home.component';
 import { LatestProductComponent } from '../../shared/components/latest-product/latest-product.component';
import { SharedModule } from 'src/app/shared/shared.module';
        
 
    @NgModule({
  declarations: [
    MainCarouselComponent,
     BestSellerComponent,
     TopCategoryComponent,
   
     HomeComponent,
 
      
   ],  
  imports: [
    CommonModule,
    HomeRoutingModule,
    SharedModule,
     
   ]
})
export class HomeModule { }
