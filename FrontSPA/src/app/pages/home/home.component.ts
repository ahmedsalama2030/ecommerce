import { Pagination } from './../../core/models/Pagination ';
 import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Category } from 'src/app/core/models/category';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductBestSeller } from 'src/app/core/models/ProductBestSeller';
import { take } from 'rxjs/operators';

@Component({
  selector: 'eg-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
 
  topCategory:any;
  paginationTopCategory:any;
  productBestSeller!:ProductBestSeller[];
  paginationProductBestSeller?:Pagination;
  productRecentView?:ProductBestSeller[];
  paginationproductRecentView?:Pagination;
   constructor(private activeRoute:ActivatedRoute ) {
    
     
   }
  ngOnInit(): void {
    this.activeRoute.data.pipe(take(1)).subscribe(
      data=>{
        this.topCategory=data['home'].topCategory.result;
        this.paginationTopCategory=data['home'].topCategory.pagination;
        console.log(data['home']);
        this.productBestSeller=data['home'].productBestSeller.result;
        this.paginationProductBestSeller=data['home'].productBestSeller.pagination;
        this.productRecentView=data['home'].productRecentView.result;
        this.paginationproductRecentView=data['home'].productRecentView.pagination;
      }
    );
  
 
   
  }
}
