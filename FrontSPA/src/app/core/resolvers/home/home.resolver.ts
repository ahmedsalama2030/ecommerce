import { map } from 'rxjs/operators';
import { ActivatedRouteSnapshot, Resolve, Router } from "@angular/router";
import { forkJoin, Observable} from "rxjs";
import { Home } from "../../models/home";
import { CategoryService } from "../../services/category.service";
  import { Injectable } from "@angular/core";
 import { ProductRecentViewService } from '../../services/productRecentView.service';
import { ProductBestSellerService } from '../../services/productBestSeller.service';
   @Injectable({
    providedIn: 'root'
})
export class HomeResolver implements Resolve<any>{
    home?:Observable<Home[]>;
    categories:any;
    PageNumber:number=1;
    itemPerPage:number=5;
    itemperPageProductRecentView=10;
    constructor(private categoryService:CategoryService,private bestSellerService:ProductBestSellerService,private productRecentViewService:ProductRecentViewService,private router:Router){}
    resolve(route:ActivatedRouteSnapshot):Observable<any>{
      return  forkJoin([
        this.categoryService.get(this.PageNumber,this.itemPerPage),
        this.bestSellerService.get(this.PageNumber,this.itemPerPage),
        this.productRecentViewService.get(this.PageNumber,this.itemperPageProductRecentView),
      ]).pipe(
      map(result => {
        return {
            topCategory: result[0],
             productBestSeller: result[1],
            productRecentView: result[2]
        };}));

       
   
         


    }
}