 import { ShoppingCartService } from './../../core/services/ShoppingCart.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Pagination } from './../../core/models/Pagination ';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ShoppingCart } from 'src/app/core/models/shoppingCart';
  
@Component({
  selector: 'eg-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {
  shoppingCard?: ShoppingCart[];
  pagination?: Pagination;
  totalPrice: number = 0;
  shipppingPrice: number = 150;
  resultUpdate: string = "";
  constructor(
    private activeRouter: ActivatedRoute,
    public authService: AuthService,
    private shoppingCartService: ShoppingCartService) { }

  ngOnInit(): void {
    this.getShoppingCartRoute();
    this.totalPrice == 0 ? this.shipppingPrice = 0 : this.shipppingPrice;
    this.shipppingPrice = this.totalPrice > 0 ? 150 : 0;
  }
  getShoppingCartRoute() {
    this.activeRouter.data.subscribe(
      data => {
        console.log(data);
        this.shoppingCard = data['shopCard'].shoppingCard.result;
        this.pagination = data['shopCard'].shoppingCard.pagination;
        this.totalPrice = data['shopCard'].totalPrice
      }
    );
  }
  pageChanged(event: any): void {

    this.pagination!.currentPage = event.page;
    this.loadshipppingPrice();
  }

  loadshipppingPrice() {
    this.shoppingCartService.get(this.pagination!.currentPage, this.pagination!.itemPerPage).subscribe(
      data => {
        this.shoppingCard = data.result
        this.pagination = data.pagination
      }
    );
  }
  quantityChange(id: any, event: any) {
    var shopping = this.shoppingCard?.find(a => a.id == id)
    shopping!.quantity = parseInt(event.target.value);
    var model = { id: shopping!.id, quantity: shopping!.quantity }
    this.shoppingCartService.updateQuantity(model).subscribe(
      () => {
        this.shoppingCartService.getTotalprice().subscribe(
          (total) => {
            this.totalPrice = total;
            this.messageSuccess(localStorage.getItem('lang') === 'ar' ? "نجاح التحديث" : "update success !");
          }
        );
      },
      (err) => { this.errorMessage(localStorage.getItem('lang') === 'ar' ? "فشل التحديث" : "update failed ?") }
    );

  }

  messageSuccess(msg: string) {
    this.resultUpdate = msg
    setTimeout(() => {
      this.resultUpdate = "";
    }, 5000);
  }
  errorMessage(msg: string) {
    this.resultUpdate = msg
    setTimeout(() => {
      this.resultUpdate = ""
    }, 5000);
  }

  deleteShopCard(id: string) {
    this.shoppingCartService.delete(id).subscribe(
      () => {
        this.shoppingCard?.forEach(e => {
          if (e.id == id) {
            this.shoppingCartService.get().subscribe(
              data => { this.shoppingCard = data.result; this.pagination = data.pagination; }
            );
            this.authService.cardRemove();
            this.totalPrice -= (e.product.price * e.quantity);
            this.refreshShipping();
            this.messageSuccess(localStorage.getItem('lang') === 'ar' ? "نجاح الحذف" : "delete success  ");

          }
        });
      },
      err => { this.errorMessage(localStorage.getItem('lang') === 'ar' ? "فشل الحذف" : "update failed ?") }
    );
  }

  refreshShipping() {
    this.shipppingPrice = this.totalPrice == 0 ? 0 : this.shipppingPrice;
  }

}
