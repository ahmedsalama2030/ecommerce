import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ShopFilterComponent } from './shop-filter.component';

const routes: Routes = [
  {path: '', component:ShopFilterComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ShopFilterRoutingModule { }
