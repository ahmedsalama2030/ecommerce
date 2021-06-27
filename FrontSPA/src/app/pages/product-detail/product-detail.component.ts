import { Subscription } from 'rxjs';
import { AlertifyService } from './../../core/services/alertify.service';
import { ShoppingCartService } from './../../core/services/ShoppingCart.service';
import { AuthService } from './../../core/services/auth.service';
import { registerLocaleData } from '@angular/common';

import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from 'src/app/core/models/product';
import localeAr from '@angular/common/locales/ar-EG';
registerLocaleData(localeAr);
@Component({
  selector: 'eg-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product?: Product;
  cart: number = 0;
  subscription!: Subscription;
  constructor(
    private activeRoute: ActivatedRoute,
    public authService: AuthService,
    public alertifyService: AlertifyService,
    private shoppingCartService: ShoppingCartService) { }


  ngOnInit(): void {
    this.getRouteData();
  }
  getRouteData() {
    this.activeRoute.data.subscribe(
      data => {
        this.product = data['product'];
        this.product!.discount = 100;
      }
    );
  }


  addToCart(productid?: string) {
    this.authService.cart.subscribe(
      data => { this.cart = data }
    );
    var model = { userId: this.authService.decodedToken?.nameid, quantity: 1, productId: productid }
    this.subscription = this.shoppingCartService.register(model).subscribe(
      () => { this.authService.cartBehavior.next(this.cart + 1); },
      (err) => {
        if (err === 'product found') {
          let message = '';
          localStorage.getItem("lang") == 'en' ? message = 'product added' : message = 'تم إضافة المنتج'
          this.alertifyService.error(message);
        }

      }

    );
  }
  ngOnDestroy(): void {
    //this.subscription.unsubscribe()
  }
}
