import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from './../../services/Product.service';
import { Product } from 'src/app/core/models/product';
import { catchError, map } from 'rxjs/operators';
import { Category } from './../../models/category';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { empty, forkJoin, observable, Observable, of } from 'rxjs';
 import { Injectable } from '@angular/core';
import { PaginationResult } from '../../models/Pagination ';


@Injectable({
    providedIn: 'root'
})
export class ShopFilterResolver implements Resolve<any> {
    pageNumber=1;
    pageSize=12;
    constructor(private productService: ProductService,private categoryService:CategoryService) { }
    resolve(route: ActivatedRouteSnapshot):Observable<any> {
        return forkJoin([
        this.productService.get(this.pageNumber,this.pageSize),
        this.productService.getBrands(),
         this.categoryService.getAll()
        ]).pipe(
            map(result => {
              return {
                  products: result[0],
                  brands: result[1],
                  categories: result[2]
              };},
              catchError(err=>of(err))
              ));
   
    }
}
