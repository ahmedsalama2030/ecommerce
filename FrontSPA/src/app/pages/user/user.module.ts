import { TabsModule } from 'ngx-bootstrap/tabs';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
 
import { UserRoutingModule } from './user-routing.module';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
 import { AccountComponent } from './account/account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UserOrdersComponent } from './user-orders/user-orders.component';
import { UserWishListComponent } from './user-wish-list/user-wish-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { NO_ERRORS_SCHEMA } from '@angular/core';
    

@NgModule({
  declarations: [ 
       AccountSettingsComponent,
        AccountComponent, UserOrdersComponent,
         UserWishListComponent ,
          ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule ,
    TranslateModule,
    PaginationModule.forRoot(),
    TabsModule.forRoot(),
     SharedModule
  ],
  schemas:[NO_ERRORS_SCHEMA]
 
})
export class UserModule { }
