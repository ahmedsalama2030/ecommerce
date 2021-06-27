import { Subscription } from 'rxjs';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { AfterViewInit, Component, ElementRef, HostListener, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SocialAuthService } from 'angularx-social-login';
import { BsDropdownConfig } from 'ngx-bootstrap/dropdown';
import { openClose, Fade } from 'src/app/core/animations/general-animations';
 import { AuthService } from 'src/app/core/services/auth.service';
 
@Component({
  selector: 'eg-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
  animations:[openClose,Fade ],  
})
export class NavbarComponent implements OnInit,OnDestroy ,AfterViewInit{
  isLoggedIn?:boolean;
 isExternalAuth ?:boolean;
userPhoto!:string;
 showSearch:boolean=false;
 @ViewChild('header') header!: ElementRef;
 headerTop:number=0;
 show:boolean=false;
 isShowCategoryMenu:boolean=false;
 IsShowHeader:boolean=false;
subscription:Subscription[]=[];
  menus:any=['home','blog','shop','contact us']
  categoryMenu:any=[
    { icon:'fa-laptop',text:'computers' },
    { icon:'fa-clock',text:'watchs' },
    { icon:'fa-print',text:'printers' },
    { icon:'fa-headphones',text:'headphones' },
    { icon:'fa-fax',text:'fax machines' },
    { icon:'fas fa-tshirt',text:'clothings' },
    { icon:'fa-camera',text:'cameras' },
    { icon:'fa-mobile',text:'mobiles' },
  ]
  constructor(
    public  translate: TranslateService,
    public authService:AuthService,
     private _socialAuthService: SocialAuthService,
    ) { }
 
  ngAfterViewInit(): void {
    this.headerTop = this.header.nativeElement.offsetTop as number;
  let socialsub=  this._socialAuthService.authState.subscribe(user =>    this.isExternalAuth = user != null)
this.subscription.push(socialsub);
  }
 
 cart:number=0;

 @HostListener("window:scroll", [])
 onWindowScroll() {
  if (window.pageYOffset >=this.headerTop ) {
    this.header.nativeElement.classList.add("sticky");
    this.IsShowHeader=true;
  }
    else{
    this.header.nativeElement.classList.remove("sticky");
    this.IsShowHeader=false;

    }
 }



  ngOnInit(): void {
  let authSub= this.authService.cart.subscribe(  data=>{this.cart=data}  );
    this.isLoggedIn= this.authService.loggedIn();
   let photoSub= this.authService.userPhoto.subscribe( (url)=>{ this.userPhoto=url} )
    this.subscription.push(authSub);
    this.subscription.push(photoSub);


  }

   
  ShowCategoryMenu(){
    this.isShowCategoryMenu=!this.isShowCategoryMenu;
   }

   LogOut(){
    this.authService.restConfi();
    this.isLoggedIn=false;
    if(this.isExternalAuth)
     this.authService.signOutExternal();
      
   }

   ngOnDestroy(): void {
    this.subscription.forEach(sub => {
      sub.unsubscribe();
    });
  }
}
