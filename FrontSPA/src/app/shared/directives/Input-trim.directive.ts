import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[InputTirmFilter]'
})
export class InputTirmFilterDirective {

  constructor(private el: ElementRef) { }
@HostListener('change') onChange() {
 let value=this.el.nativeElement.value;
 this.el.nativeElement.value=value.trim();
 }

}
