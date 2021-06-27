import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/app/core/guards/auth.guard';
import { AccountUserResolver } from 'src/app/core/resolvers/Account-User/account-user-resolver';
import { AccountSettingsComponent } from './account-settings/account-settings.component';

const routes: Routes = [
  {  path:'',component:    AccountSettingsComponent,
  canActivate:[AuthGuard],
  resolve:{data:AccountUserResolver}
}


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
