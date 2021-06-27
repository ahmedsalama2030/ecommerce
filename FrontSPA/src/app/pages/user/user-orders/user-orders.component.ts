import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Pagination } from './../../../core/models/Pagination ';
import { OrderListDto } from './../../../core/models/Dtos/OrderListDto';
 import { OrderService } from 'src/app/core/services/order.service';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'user-orders',
  templateUrl: './user-orders.component.html',
  styleUrls: ['./user-orders.component.css']
})
export class UserOrdersComponent implements OnInit ,OnDestroy{
 
 
@Input() orders?:OrderListDto[];
@Input() pagination !:Pagination;
subscription?:Subscription;
  constructor(private route:ActivatedRoute,private orderservices:OrderService) { }
  

ngOnInit(): void {   }

  getid(index: any, item: any) {
    return item.id;
  }
  pageChanged(event:any){
    this.pagination!.currentPage = event.page;
    this.loadOrders();
  }
  loadOrders(){
   this.subscription= this.orderservices.get(this.pagination!.currentPage, this.pagination!.itemPerPage).subscribe(
      data => {
        this.orders = data.result
        this.pagination = data.pagination!;
 
      }
    );
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
    }
}
