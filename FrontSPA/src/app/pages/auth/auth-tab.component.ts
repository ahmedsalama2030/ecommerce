 import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'eg-auth-tab',
  templateUrl: './auth-tab.component.html',
  styleUrls: ['./auth-tab.component.css']
})
export class AuthTabComponent implements OnInit {
  direction:string='ltr'
  toggleForm:boolean = true;
  constructor( ) { }

  ngOnInit(): void {
    let lang=localStorage.getItem("lang")||'en';
    this.direction=(lang==='en')?'ltr':'rtl';
  }

  toggleAuth(){
    this.toggleForm=!this.toggleForm;
  }
  changeAuthToggle(value:boolean){
    this.toggleForm=value;
  }
}
