import { AuthService } from 'src/app/core/services/auth.service';
import { AuthModule } from './../../../pages/auth/auth.module';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'eg-nav-section',
  templateUrl: './nav-section.component.html',
  styleUrls: ['./nav-section.component.css']
})
export class NavSectionComponent implements OnInit {

  @Input() name:string='';
  @Output() next=new EventEmitter<boolean>();
  @Output() back=new EventEmitter<boolean>();
  
  constructor(public authService:AuthService) { }

  ngOnInit() {
  }
  decrement(){
    this.back.emit(true);

  }
  increment(){
this.next.emit(true);
  }
}
