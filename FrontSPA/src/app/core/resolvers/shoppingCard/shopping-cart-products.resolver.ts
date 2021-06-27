import { ShoppingCartService } from './../../services/ShoppingCart.service';
import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of, forkJoin } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartProductsResolver implements Resolve<any> {
  pageNumber=1;
  pageSize=2;
  constructor(private shoppingCartService: ShoppingCartService,private router:Router) { }
  resolve(route: ActivatedRouteSnapshot):Observable<any> {
    return forkJoin([
      this.shoppingCartService.get(this.pageNumber,this.pageSize),
      this.shoppingCartService.getTotalprice()

    ])  
    .pipe(
      map(result => {
        return {
            shoppingCard: result[0],
            totalPrice: result[1],
         };},
         catchError(()=>
          this.router.navigate([''])
          )
        ));
   
    }
}

      