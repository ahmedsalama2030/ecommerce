import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthDeActivateGuard } from 'src/app/core/guards/authDeactive.guard';
import { AuthTabComponent } from './auth-tab.component';

const routes: Routes = [
  {  path:'',component:AuthTabComponent,canActivate:[AuthDeActivateGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
