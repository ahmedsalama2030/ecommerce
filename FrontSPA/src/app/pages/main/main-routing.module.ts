import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 import { HomeResolver } from 'src/app/core/resolvers/home/home.resolver';
import { ProductDetailResolver } from 'src/app/core/resolvers/product/productDetail.resolver';
import { ShopFilterResolver } from 'src/app/core/resolvers/shopFilter/shopFilter.resolver';
import { ShoppingCartProductsResolver } from 'src/app/core/resolvers/shoppingCard/shopping-cart-products.resolver';
 import { MainComponent } from './main.component';

const routes: Routes = [
  {
    path: '', component: MainComponent, children: [
      {
        path: '', loadChildren: () => import('./../home/home.module').then(m => m.HomeModule),pathMatch: 'full',resolve:{home:HomeResolver}
      },
      {
        path: 'product-detail/:id', loadChildren: () => import('./../product-detail/product-detail.module').then(m => m.ProductDetailModule),resolve:{product:ProductDetailResolver}
      },
      {
        path: 'shoping-filter', loadChildren: () => import('./../shop-filter/shop-filter.module').then(m => m.ShopFilterModule),resolve:{shop:ShopFilterResolver}
      },
      {
        path: 'shoping-cart', loadChildren: () => import('./../shopping-cart/shopping-cart.module').then(m => m.ShoppingCartModule),resolve:{shopCard:ShoppingCartProductsResolver}
      },
      {
        path: 'checkout', loadChildren: () => import('./../checkout/checkout.module').then(m => m.CheckoutModule)
      }
      ,
      {
        path: 'user', loadChildren: () => import('./../user/user.module').then(m => m.UserModule)
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./../auth/auth.module').then(a => a.AuthModule)
  },
  { path: '**', redirectTo: '' }
]


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
