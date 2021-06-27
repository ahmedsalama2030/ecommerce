import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DummyResolver } from 'src/app/core/resolvers/Category/DummyResolver';
import { TopCategoryResolver } from 'src/app/core/resolvers/Category/TopCategoryResolver';
import { HomeComponent } from './home.component';
 
const routes: Routes = [
  {path: '', component:HomeComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
