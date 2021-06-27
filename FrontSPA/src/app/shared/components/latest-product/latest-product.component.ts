import { Router } from '@angular/router';
import { Observable, Observer, Subject, Subscription } from 'rxjs';
import { Pagination } from './../../../core/models/Pagination ';
import { Component, ElementRef, Input, OnInit, ViewChild, OnDestroy, AfterViewInit, Renderer2 } from '@angular/core';
import { ProductBestSeller } from 'src/app/core/models/ProductBestSeller';
import { AuthService } from 'src/app/core/services/auth.service';
import { ProductRecentViewService } from 'src/app/core/services/productRecentView.service';
import { SliderComponent } from '..';
import { DataServices } from 'src/app/core/services/DataServices.service';
 
@Component({
  selector: 'eg-latest-product',
  templateUrl: './latest-product.component.html',
  styleUrls: ['./latest-product.component.css']
})
export class LatestProductComponent implements OnInit,  OnDestroy {
  @ViewChild('image') image!: ElementRef;
   
 
  
  @Input() productRecentView!: ProductBestSeller[];
  @Input() pagination?: Pagination;
  subscription?: Subscription;
  itemPerPage: number = 10;
  pageNumber?: Number;
  scrollNext:number=0;
  Title: string = 'recently viewed products';
 x:number=0;


  constructor(
    private router:Router,
     public authService: AuthService,
      private productRecentViewService: ProductRecentViewService) { }
  

  ngOnInit(): void { 
  }
  next() {
    let image = this.image.nativeElement.offsetWidth;
    
    
   }
  // back change
  back() {

    // let image = this.image.nativeElement.offsetWidth;
    // this.BoxContainer.nativeElement.scrollLeft -= image;
  }
  getProducts() {
    this.subscription = this.productRecentViewService.get(this.pagination!.currentPage, this.itemPerPage).subscribe(
      (data) => {
        data.result?.forEach((el) => {
          this.productRecentView?.push(el)
        });
        this.pagination = data.pagination

      }
    );
  }
  EndScroll(event: any) {
     if (event)
    this.pagination!.currentPage += 1
    if(this.pagination!.currentPage <=  this.pagination!.totalPages) 
        this.getProducts();
  }
  StartScroll(event: any) {
 
    if (event){
      this.productRecentView = this.productRecentView?.slice(0, 12);
      this.pagination!.currentPage=1;
    }
   }

  // function arrive end scroll

  getid(item: any) {
    return item.id;
  }

  navigate(id:any){
    this.router.navigate(['/product-detail/'+id]);
  }
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }






}
