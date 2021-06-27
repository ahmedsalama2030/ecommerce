import { Pagination } from './../../../core/models/Pagination ';
import { ProductBestSeller } from '../../../core/models/ProductBestSeller';
import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductBestSellerService } from 'src/app/core/services/productBestSeller.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DataServices } from 'src/app/core/services/DataServices.service';
import { Router } from '@angular/router';

@Component({
  selector: 'eg-best-seller',
  templateUrl: './best-seller.component.html',
  styleUrls: ['./best-seller.component.css']
})
export class BestSellerComponent implements OnInit {
   @ViewChild('image') image!: ElementRef;
  @Input() productsBestSeller?: ProductBestSeller[];
  @Input() pagination?: Pagination;
  itemPerPage: number = 4;
   pageNumber?: Number;
   Title:string='best seller';
   notifier = new Subject();  // valiable destory
  constructor(
    public router:Router,
    public authService: AuthService,
    private productBestSeller:ProductBestSellerService) { }
 
  ngOnInit(): void {
   }

// get id
  getid(index: any, item: any) {
    return item.id;
  } 

  // next change
  next() { }
 // end 
// back change
  back() {   }
  // get product Best from Api
  getProductBestSeller( ) {
    this.productBestSeller.get( this.pagination!.currentPage, this.itemPerPage).pipe(takeUntil(this.notifier)).subscribe(
      (data) => {
         data.result?.forEach((el) => {
          this.productsBestSeller?.push(el)
        });
          this.pagination = data.pagination
      
      }
    );
  }

  EndScroll(event: any) {
    if (event)
   this.pagination!.currentPage += 1
   if(this.pagination!.currentPage <=  this.pagination!.totalPages) 
       this.getProductBestSeller();
 }
 StartScroll(event: any) {

   if (event){
     this.productsBestSeller = this.productsBestSeller?.slice(0, 10);
     this.pagination!.currentPage=1;
   }
  }
  
  nagivate(id:any){
    this.router.navigate(['/product-detail/'+id]);
  }
  ngOnDestroy(): void {   // destpory subscription
    this.notifier.next();
    this.notifier.complete();
  }
} 
