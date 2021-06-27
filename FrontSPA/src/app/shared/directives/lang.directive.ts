 import { AfterViewInit, Directive, ElementRef, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/services/auth.service';
//@ts-ignore
import * as words from '../../../assets/jsons/dictionary.json'
@Directive({
  selector: '[egLang]'
})
export class LangDirective implements OnInit, AfterViewInit {
  _words = [];

  constructor(private authService: AuthService, private ref: ElementRef) { }

  ngOnInit(): void {
    this._words = words.default;
   }
  ngAfterViewInit(): void {
this.authService.lang.subscribe(
  lang=>{
   
    if(lang== 'en'){
      try{
        var word=this._words.filter(word=>word['ar']===(this.ref.nativeElement.innerText));
        if(word[0]['ar']==this.ref.nativeElement.innerText)
        this.ref.nativeElement.innerText=word[0]['en'];
          
      }catch{
       }
    }
    if(lang== 'ar'){
      try{
        var word=this._words.filter(word=>word['en']===(this.ref.nativeElement.innerText));
         if(word[0]['en']==this.ref.nativeElement.innerText)
        this.ref.nativeElement.innerText=word[0]['ar'];
       }catch{        
    }
    }
  }
);
  }
}
