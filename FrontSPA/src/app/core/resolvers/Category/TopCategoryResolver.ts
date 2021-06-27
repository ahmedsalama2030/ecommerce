import { catchError } from 'rxjs/operators';
import { Category } from './../../models/category';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { empty, observable, Observable, of } from 'rxjs';
import { CategoryService } from '../../services/category.service';
import { Injectable } from '@angular/core';
import { PaginationResult } from '../../models/Pagination ';


@Injectable({
    providedIn: 'root'
})
export class TopCategoryResolver implements Resolve<PaginationResult<Category[]>> {
    pageNumber=1;
    pageSize=4;
    constructor(private categoryService: CategoryService) {
    }
    resolve(route: ActivatedRouteSnapshot):Observable<PaginationResult<Category[]>> {
        return this.categoryService.get(this.pageNumber,this.pageSize).pipe(
 
            
        ) 
    }
}
