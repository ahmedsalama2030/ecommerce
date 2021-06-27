import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';
import { Component, ElementRef, Input, OnInit, Output, ViewChild, EventEmitter, DoCheck, OnChanges, SimpleChanges, AfterViewInit } from '@angular/core';
import { DataServices } from 'src/app/core/services/DataServices.service';

@Component({
  selector: 'slider',
  templateUrl: './Slider.component.html',
  styleUrls: ['./Slider.component.css']
})
export class SliderComponent implements OnInit{
  @ViewChild('slideContainer') BoxContainer?: ElementRef;
     
   @Input() scrollBack?:Number;
   @Output() isEnd=new EventEmitter ();
  @Output() isStart=new EventEmitter ();
    scroll = new Subject<number>();
  currentScroll = this.scroll.asObservable();
  isDown = false;
  startX?: any;
  scrollLeft?: any;
  changeLog: string[] = [];
  @Input()
  get scrollNext(): number { return this._name; }
  set scrollNext(name: number) {
  console.log(name);
  }
  private _name = 1;
 
  constructor( ) { }
  
   
    
  ngOnInit() {
    
  } 
  onMouseDown(e: any) {
    this.isDown = true;
    this.startX = e.pageX - this.BoxContainer!.nativeElement.offsetLeft;
    this.scrollLeft = this.BoxContainer!.nativeElement.scrollLeft;
 }
  onMouseLeave(event: any) {
    this.isDown = false;
 }
  onMouseUp(event: any) {
    this.isDown = false;
 }
  onMouseMove(e: any) {
    if (!this.isDown) return;  // stop the fn from running
    e.preventDefault();
   const x = e.pageX - this.BoxContainer?.nativeElement.offsetLeft;
    const move = (x - this.startX);
    this.BoxContainer!.nativeElement.scrollLeft = this.scrollLeft - move;
 
  }


  scrollGategory() {
     let continerMove = Math.abs(this.BoxContainer!.nativeElement.scrollLeft) + 100;
    let scrollWidth = this.BoxContainer!.nativeElement.scrollWidth;
    let offsetWidth = this.BoxContainer!.nativeElement.offsetWidth;
    if (scrollWidth - continerMove <= offsetWidth)
      this.End();

    if (this.BoxContainer!.nativeElement.scrollLeft == 0 )
      this.Start();

  }
  End() {

    this.isEnd.emit(true)
    console.log("end")

  }
  Start() {
    this.isStart.emit(true);
    console.log("start")

 }
}
 

