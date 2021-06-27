import { AlertifyService } from './../../../core/services/alertify.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/core/models/user';

@Component({
  selector: 'eg-personInfo',
  templateUrl: './personInfo.component.html',
  styleUrls: ['./personInfo.component.css']
})
export class PersonInfoComponent implements OnInit {
@Output() personInfoStatus=new EventEmitter<boolean>();
formInfo:any={};
user!:User;
  constructor(
    private router:Router,
    private alertifyService:AlertifyService
  ) { }

  ngOnInit() {
this.user=JSON.parse(localStorage.getItem("user")!);
console.log(this.checkInfo());
if (!this.checkInfo()){
this.router.navigate(['/user']);
this.ErrorMassage();
}
  }
  confirm(){
    this.personInfoStatus.emit(true)
  }
  checkInfo(){
    
     if(
    this.user.firstName ||
     this.user.lastName ||
     this.user.middelName ||
     this. user.phoneNumber ||
     this.user.state || 
     this.user.street ||
     this. user.city  )
     return true
     return false
  }

  ErrorMassage(){
    if(localStorage.getItem('lang')||'en'==='en')
    this.alertifyService.error('update personal info')
    else
    this.alertifyService.error('حدث معلوماتك الشخصية')


  }
}
