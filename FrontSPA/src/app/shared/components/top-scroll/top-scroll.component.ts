
import { Component, OnInit, Inject, HostListener } from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'eg-top-scroll',
  templateUrl: './top-scroll.component.html',
  styleUrls: ['./top-scroll.component.css']
})
export class TopScrollComponent implements OnInit {

  windowScrolled: boolean=false;
  headerPosition: number = 0;
   constructor() { }
   ngOnInit() {
  }
  @HostListener("window:scroll", [])
  onWindowScroll() {
    if (window.pageYOffset >=20 ) 
    this.windowScrolled = true;
    else
    this.windowScrolled = false;
 
  }
     
  
  scrollToTop() {
    window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth'
        });
  }
  
}