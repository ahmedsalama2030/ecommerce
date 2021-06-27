import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'eg-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit, OnDestroy {
  payStatus?: boolean = false;
  personInfoStatus?: boolean;
  start: boolean = true;
  totalPrice?: number;
  constructor(private router: Router) { }


  ngOnInit() {
    this.totalPrice = history.state.price;
    if (this.totalPrice == 0 || this.totalPrice == undefined) {
      this.router.navigate(['/shoping-cart']);
    }
  }
  personInfoStatusChange(value: any) {
    this.personInfoStatus = value;
  }
  payStatusChange(value: any) {
    this.payStatus = value;
  }

  ngOnDestroy(): void {
    localStorage.removeItem("orderinfo");
  }
}
