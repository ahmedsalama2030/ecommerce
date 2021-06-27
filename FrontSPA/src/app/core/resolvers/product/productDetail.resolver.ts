import { catchError } from 'rxjs/operators';
import { Category } from './../../models/category';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { empty, observable, Observable, of } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { Injectable } from '@angular/core';
import { PaginationResult } from '../../models/Pagination ';
import { Product } from '../../models/product';
import { ProductService } from '../../services/Product.service';


@Injectable({
    providedIn: 'root'
})
export class ProductDetailResolver implements Resolve<Product> {
 
    constructor(private productService: ProductService) {
    }
    resolve(route: ActivatedRouteSnapshot):Observable<Product> {
        
        return this.productService.getById(route.params['id'])
      
    }
}
