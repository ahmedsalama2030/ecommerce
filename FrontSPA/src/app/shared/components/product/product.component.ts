import { Subscription } from 'rxjs';
import { AlertifyService } from './../../../core/services/alertify.service';
import { ShoppingCartService } from './../../../core/services/ShoppingCart.service';
import { Product } from 'src/app/core/models/product';
import { AuthService } from './../../../core/services/auth.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { ProductBestSeller } from 'src/app/core/models/ProductBestSeller';
import { Router } from '@angular/router';

@Component({
  selector: 'eg-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit,OnDestroy {
  @Input() product?: ProductBestSeller;
  @Input() productDefault?: Product;
  cart: number = 0;
  discount=100;
subscription:Subscription[]=[];
  constructor(
    public authService: AuthService,
    private router:Router,
    private alertifyService:AlertifyService,
    private shoppingCartService:ShoppingCartService) { }
  

  ngOnInit(): void { 
    
  }

  addCart(productid?:string) {
 let authSub=   this.authService.cart.subscribe(
      data => { this.cart = data }
    );
    var model={userId:this.authService.decodedToken?.nameid,quantity:1,productId:productid}
     let cartSub=this.shoppingCartService.register(model).subscribe(
       ()=>{   
         this.product!.isShop=true;
          this.authService.cartBehavior.next(this.cart + 1);
           
       },
       (err)=>{
         if(err==='product found'){
           let message='';
        localStorage.getItem("lang")=='en'? message='product found':message='تم إضافة المنتج'
         this.alertifyService.error(message);
          }
       } 
       
     );

this.subscription.push(cartSub);
this.subscription.push(authSub);

  }
  NavigateProductDetail(){
this.router.navigate(['/product-detail/'+this.product?.productId]);
  }
  NavigateProductDetailDefault(){
    this.router.navigate(['/product-detail/'+this.productDefault?.id]);

  }
  ngOnDestroy(): void {
    this.subscription.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
