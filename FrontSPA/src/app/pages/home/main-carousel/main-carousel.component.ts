import { Component, OnInit, OnDestroy } from '@angular/core';
 import { timer, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FadeCarousel } from 'src/app/core/animations/general-animations';
@Component({
  selector: 'eg-main-carousel',
  templateUrl: './main-carousel.component.html',
  styleUrls: ['./main-carousel.component.css'],
  animations:[FadeCarousel]
})
export class MainCarouselComponent implements OnInit,OnDestroy {
  
   slider=[ 
     {path:"assets/img/banner01.jpg"},
     {path:"assets/img/banner01.jpg"},
     {path:"assets/img/banner02.jpg"}
    ];
    path:string='';
    indexPath=0;
    notifier = new Subject();  // valiable destory
    isChange=false;
   constructor() { }

  ngOnInit(): void {
    this.path=this.slider[this.slider.length-1].path;
    this.changeSlider();
  //   
  }
changeSlider(){
  timer(1000,5000).pipe(takeUntil(this.notifier)).subscribe((x)=> {
    this.isChange=!this.isChange;
      this. path=this.slider[this.indexPath].path;
      
      this.indexPath++;
      if(this.indexPath>=this.slider.length)
      this.indexPath=0;
  }  );
 }
 
 // when dot clicke
 nextSlide(index:number) {
   this.path=this.slider[index].path;
   this.indexPath=index;
  }
 
 ngOnDestroy(): void {   // destpory subscription
  this.notifier.next();
  this.notifier.complete();
}

}
