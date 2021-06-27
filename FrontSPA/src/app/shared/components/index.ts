 import { FooterComponent } from "./footer/footer.component";
import { LatestBlogComponent } from "./latest-blog/latest-blog.component";
import { LatestProductComponent } from "./latest-product/latest-product.component";
import { NavSectionComponent } from "./nav-section/nav-section.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { ProductComponent } from "./product/product.component";
import { SliderComponent } from "./Slider/Slider.component";
import { TopScrollComponent } from "./top-scroll/top-scroll.component";
import { TopTitleComponent } from "./top-title/top-title.component";

 export const components: any[] = [
     ProductComponent,
     FooterComponent,
     NavbarComponent,
     TopTitleComponent,
     SliderComponent,
     LatestProductComponent,
     TopScrollComponent,
     LatestBlogComponent,
     NavSectionComponent];
 
 export * from "./product/product.component";
 export * from "./navbar/navbar.component";
 export * from"./footer/footer.component";
 export * from"./top-title/top-title.component";
 export * from "./nav-section/nav-section.component";
 export * from "./Slider/Slider.component";

 
