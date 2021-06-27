import { take, takeUntil } from 'rxjs/operators';
import { AuthService } from './../../core/services/auth.service';
import { Category } from './../../core/models/category';
import { Pagination } from './../../core/models/Pagination ';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductService } from 'src/app/core/services/Product.service';
import { ActivatedRoute,Router } from '@angular/router';
import { Product } from 'src/app/core/models/product';
import { Subject } from 'rxjs';
@Component({
  selector: 'eg-shop-filter',
  templateUrl: './shop-filter.component.html',
  styleUrls: ['./shop-filter.component.css']
})
export class ShopFilterComponent implements OnInit ,OnDestroy{
 notifier = new Subject();  // valiable destory
  priceFrom: number = 100;
  priceTo: number = 400;
  products?: Product[];
  pagination?: Pagination;
  categoriesSlice?: Category[];
  categories?: Category[];
  brandsSlice?: string[];
  brands?: string[];
  showBrand: boolean = true;
  showcategory: boolean = true;
  priceModel: any = {};
  sortChoice!: string ;
  lang: string = 'en';
  totalItem:number=0;
  constructor(
    private router:Router,
    private productService: ProductService,
     private activeRoute: ActivatedRoute, 
     public authService: AuthService) { }
  ngOnInit(): void {
    this.activeRoute.data .subscribe(
      data => {
        this.products = data['shop'].products.result;
        this.pagination = data['shop'].products.pagination;
        this.categoriesSlice = data['shop'].categories;
        this.categories = this.categoriesSlice?.slice(0, 5);
        this.brandsSlice = data['shop'].brands;
        this.brands = this.brandsSlice?.slice(0, 5);
      }
    );
      this.authService.lang.pipe(takeUntil(this.notifier) ).subscribe((lang)=>{this.lang = lang})
    
  }

  pageChanged(event: any): void {

    this.pagination!.currentPage = event.page;
    this.loadProducts();
  }
  loadProducts() {
    this.productService.get(this.pagination!.currentPage, this.pagination!.itemPerPage).subscribe(
      data => {
        this.products = data.result
        this.pagination = data.pagination;
 
      }
    );
  }

  sortName() {
    this.sortChoice = 'name';
    this.products = this.products?.sort(function (a, b) { return a.name.localeCompare(b.name) });
  }
  sortPrice(sortType: any) {
    this.sortChoice = 'price';

    if (sortType === 'des')
      this.products = this.products?.sort(function (a, b) { return b.price - a.price });
    else
      this.products = this.products?.sort(function (a, b) { return a.price - b.price });
  }
  moreBrands() {
    if (this.showBrand)
      this.brands = this.brandsSlice;
    else
      this.brands = this.brandsSlice?.slice(0, 15);

    this.showBrand = !this.showBrand;
  }
  moreCategory() {
    if (this.showcategory)
      this.categories = this.categoriesSlice;
    else
      this.categories = this.categoriesSlice?.slice(0, 5);

    this.showcategory = !this.showcategory;
  }

filter(type:string,value:string,paramsFrom?:any,paramsTo?:any){
  this.productService.get(1, this.pagination!.itemPerPage, type,value,paramsFrom,paramsTo).
  pipe(takeUntil(this.notifier) ) .subscribe(
   data => {
     this.products = data.result;
     this.pagination = data.pagination;
     console.log(data.pagination);
   },
   err => {
     console.log(err);
   }
 );
}


  filterBrands(brand: any) {
    this.filter("barnd",brand)
  }


  filterCategory(category: any) {
    this.filter("category",category)

  }
  pricsFilterRange() {
    this.filter("price",'', this.priceModel.from,this.priceModel.to )

    
  }

  colorFilter(color: any) {
    this.filter("colorTag", color );
    
  }

  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
  }
  nagivate(id:any){
    this.router.navigate(['/product-detail/'+id]);
  }
  
}
