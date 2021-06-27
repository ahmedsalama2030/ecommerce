import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
 


@Injectable({
  providedIn: 'root'
})
export class AuthDeActivateGuard implements CanActivate {
 
  constructor(
      private authservice:AuthService,
      private router:Router
      ) {}
  canActivate():  boolean {
    if(this.authservice.loggedIn()){
       return false; 
    }
     return true;
   
  }
}
