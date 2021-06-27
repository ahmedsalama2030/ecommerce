import { AlertifyService } from './../../../core/services/alertify.service';
import { AuthService } from 'src/app/core/services/auth.service';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
  import { Router } from '@angular/router';
import { delay, dematerialize, finalize, map, materialize, take, tap } from 'rxjs/operators';
 import { SocialUser } from 'angularx-social-login';
import { ExternalAuth } from 'src/app/core/models/Dtos/ExternalAuth';

@Component({
  selector: 'eg-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @Output() registerForm = new EventEmitter<boolean>();
  @Input() toggleForm?: boolean;
  loginform: any = {};
  clickedStatus: boolean = false;
  loader: boolean = false
  loaderGoogle: boolean = false
  userNamePlace?: string = 'user Name';
  passwordPlace?: string = 'password';
  errorMassage: string = '';
  constructor(
    public authService: AuthService,
    private alertifyService:AlertifyService,
     private router: Router) { }
  ngOnInit(): void {
    if (this.authService.sitelang == "ar") {
      this.userNamePlace = 'اسم المستخدم'
      this.passwordPlace = 'كلمة المرور'
    }
   
    
  }
  Onlogin() {// login function
    this.loader = true;
    this.authService.login(this.loginform).pipe(
      materialize() ,
      delay(500),
      dematerialize(),
      finalize(
        () => this.loader = false  ),
        take(1)
      ) . subscribe(
      () =>this.router.navigate([""]),
       error =>  this.alertifyService.error(error)
        
       );

  }
  goRegiser() {
    this.registerForm.emit(!this.toggleForm);
  }

  public externalLogin () {
    this.loaderGoogle = true;
    this.authService.signInWithGoogle()
    .then(res => {
      console.log(res);
      const user: SocialUser = { ...res };
       const externalAuth: ExternalAuth = {
        provider: user.provider,
        idToken: user.idToken
      }
      this.validateExternalAuth(externalAuth);
    }, error =>  {      this.loaderGoogle = false;
;     this.errorMassageGoogle()}
    )
  }
    

  errorMassageGoogle(){
if(localStorage.getItem('lang')=='en')
this.alertifyService.error("Error  signin")
else
this.alertifyService.error("خطأ فى الدخول ")

  }
  private validateExternalAuth(externalAuth: ExternalAuth) {
    this.authService.externalLogin( externalAuth)
      .subscribe(() => {this.router.navigate([""])  },
      error => {
        this.alertifyService.error(error)
        this.loaderGoogle = false;
        this.authService.signOutExternal();
      });
  }
}
