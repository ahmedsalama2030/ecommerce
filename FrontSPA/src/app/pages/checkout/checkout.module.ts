import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckoutComponent } from './checkout/checkout.component';
import { CheckoutRoutingModule } from './checkout-routing.module';
import { PersonInfoComponent } from './personInfo/personInfo.component';
import { PaymentComponent } from './payment/payment.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
 
@NgModule({
  imports: [
    CommonModule,
    CheckoutRoutingModule,
    FormsModule,
    SharedModule,
    TranslateModule
  ], 
  declarations: [CheckoutComponent,PersonInfoComponent,PaymentComponent]
})
export class CheckoutModule { }
