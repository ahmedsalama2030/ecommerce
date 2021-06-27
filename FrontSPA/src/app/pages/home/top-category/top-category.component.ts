 import { Pagination } from './../../../core/models/Pagination ';
import { Category } from './../../../core/models/category';
import { Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
import { CategoryService } from 'src/app/core/services/category.service';
import { Subject, timer } from 'rxjs';
import { Router } from '@angular/router';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'eg-top-category',
  templateUrl: './top-category.component.html',
  styleUrls: ['./top-category.component.css']
})

export class TopCategoryComponent implements OnInit ,OnDestroy{
  @ViewChild('slide') slider!: ElementRef;
  @ViewChild('image') image!: ElementRef;

  @Input() topCategory?: Category[];
  @Input() pagination?: Pagination;
  itemPerPage: number = 4;
  notifier = new Subject();  // valiable destory

  Title: string = 'best category'

  constructor(
    private categoryService: CategoryService,
    private router:Router,
     public authService: AuthService) { }

  ngOnInit(): void {  }

  nagivateShop(){
this.router.navigate(["/shoping-filter"]);
  }
// get id
  getid(index: any, item: any) {
    return item.id;
  }  
  // next change
  next() {
    // let image = this.image.nativeElement.offsetWidth;
    // this.slider.nativeElement.scrollLeft += image;
  }

   
 
 
  

  // end 
// back change
  back() {
    //  let image = this.image.nativeElement.offsetWidth;
    // this.slider.nativeElement.scrollLeft -= image;
  }


  // retrive category
  getTopGategory() {
     
     this.categoryService.get(this.pagination!.currentPage, this.pagination?.itemPerPage).pipe(takeUntil(this.notifier)).subscribe(
      (data) => {
        data.result?.forEach((el) => {
          this.topCategory?.push(el)
        });
        this.pagination = data.pagination
       }
    );
   
 
  }
  EndScroll(event: any) {
    if (event)
   this.pagination!.currentPage += 1
   if(this.pagination!.currentPage <=  this.pagination!.totalPages) 
       this.getTopGategory();
 }
 StartScroll(event: any) {

   if (event){
     this.topCategory = this.topCategory?.slice(0, 10);
     this.pagination!.currentPage=1;
   }
  }
 
  ngOnDestroy(): void {   // destpory subscription
    this.notifier.next();
    this.notifier.complete();
  }
  

}
