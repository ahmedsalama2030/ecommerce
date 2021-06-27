import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit, Pipe } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { DecodedTokenUser } from '../models/Dtos/decodedTokenUser';
import { Login } from '../models/Dtos/login';
 import { SocialAuthService } from "angularx-social-login";
import { GoogleLoginProvider } from "angularx-social-login";
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService  {
  jwthelper = new JwtHelperService();
  decodedToken?: DecodedTokenUser;
  sitelang: string = 'en';
  dir: string = 'ltr';
  language = new BehaviorSubject<string>('en');
  lang = this.language.asObservable();
  cartBehavior = new BehaviorSubject<number>(0);
  cart = this.cartBehavior.asObservable();
  baseUrl = environment.apiUrl + 'auth/';
  cartNumber: number = 0;
  paid: boolean = false;
  user!: User;
  public isExternalAuth?: boolean;

  // user photo url
 userUrl = new BehaviorSubject<string>('assets/img/user.png');
  userPhoto = this.userUrl.asObservable();
  constructor(
    private http: HttpClient,
    private _externalAuthService: SocialAuthService
  ) { 
    this.lang.subscribe(
      lang => {
        if (lang == 'en') {
          this.dir = 'ltr';
          this.sitelang = 'en';
        }
        else {
          this.dir = 'rtl';
          this.sitelang = 'ar';
        }
      }
    );

  }
  register(registerModel: any) {
    return this.http.post(this.baseUrl + 'register', registerModel);
  }

  login(model: Login) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((res: any) => {
        this.ConfigUser(res);
      }));


  }
  ConfigUser(res: any) {

    if (res) {
      localStorage.setItem('token', res.token);
      localStorage.setItem('user', JSON.stringify(res.user));
      if (res.user.photoUrl)
        this.userUrl.next(res.user.photoUrl);

    }
    this.decodedToken = this.jwthelper.decodeToken(res.token);
    const token = localStorage.getItem('token') || '';

  }


  loggedIn(): boolean {
    try {
      const token = localStorage.getItem('token')!;
      return !this.jwthelper.isTokenExpired(token);
    }
    catch {
      return false;
    }
  }

  cardAdd() { 
    this.cart.pipe(take(1)).subscribe(data => { this.cartNumber = data });
     this.cartBehavior.next(this.cartNumber + 1);
  }
  cardRemove() {
    this.cart.pipe(take(1)).subscribe(data => { this.cartNumber = data });

    this.cartBehavior.next(this.cartNumber - 1);
  }

  charge(userId: any, stripeToken: any, model: any) {
    return this.http.post(environment.apiUrl + 'users/' + userId + '/charge/' + stripeToken, model)
  }


  
  externalLogin(model: any) {
    console.log(this.isExternalAuth);

    return this.http.post(this.baseUrl + 'ExternalLogin', model).pipe(
      map((res: any) => {
        this.ConfigUser(res);
      }))
  };


  public signInWithGoogle = () => {
    return this._externalAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  public signOutExternal = () => {

    this._externalAuthService.signOut();
  }

  restConfi() {
    localStorage.removeItem('token');
    this.decodedToken = {};
    localStorage.removeItem("user");
    if (this.isExternalAuth)
      this.signOutExternal();
    this.cartBehavior.next(0);
    this.userUrl.next("/assets/img/user.png");
  }

}
