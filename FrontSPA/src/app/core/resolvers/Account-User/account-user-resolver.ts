import { OrderService } from 'src/app/core/services/order.service';
import { UserService } from 'src/app/core/services/user.service';
import { catchError } from 'rxjs/operators';
import { Category } from './../../models/category';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { empty, observable, Observable, of } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { Injectable } from '@angular/core';
import { PaginationResult } from '../../models/Pagination ';
import { Product } from '../../models/product';
import { ProductService } from '../../services/Product.service';
import { OrderListDto } from '../../models/Dtos/OrderListDto';


@Injectable({
    providedIn: 'root'
})
export class AccountUserResolver implements Resolve<PaginationResult<OrderListDto[]>> {
 
    constructor(private orderService: OrderService) {
    }
    resolve(route: ActivatedRouteSnapshot):Observable<PaginationResult<OrderListDto[]>> {
        
        return this.orderService.get(1,10);
      
    }
}
