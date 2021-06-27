import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Observer, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataServices {
      scrollLastest = new Subject<number>();
   currentScrollLastest = this.scrollLastest.asObservable();
    constructor() { }

 


}
