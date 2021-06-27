import { ShoppingCartService } from './../../core/services/ShoppingCart.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
 
import { AuthService } from 'src/app/core/services/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'eg-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
  

})
export class MainComponent implements OnInit,OnDestroy {
  itemsPerSlide = 3;
  singleSlideOffset = true;
  noWrap = false;
   slidesChangeMessage = '';
  show:boolean=false;
 subscription!:Subscription;
 
  onSlideRangeChange(indexes: number[]): void {
    this.slidesChangeMessage = `Slides have been switched: ${indexes}`;
  }
  constructor(public authService:AuthService,private shoppingCartService:ShoppingCartService) { }
 

  ngOnInit(): void {
   this.subscription= this.shoppingCartService.getTotalCount().subscribe(
      (total:number)=>{
        this.authService.cartBehavior.next(total);
      }
    );
  }
  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
