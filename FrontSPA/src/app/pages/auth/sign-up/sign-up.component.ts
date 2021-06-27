import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MustMatch } from './must-match.validator';
import { delay, dematerialize, finalize, map, materialize } from 'rxjs/operators';
import { AlertifyService } from 'src/app/core/services/alertify.service';

@Component({
  selector: 'eg-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {
  @Output() loginForm = new EventEmitter<boolean>();
  @Input() toggleForm?: boolean;
  errorMassage: string = '';
  loader: boolean = false
  signupForm!: FormGroup;
  lang: string = 'en';
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private alertifyService: AlertifyService,

  ) { }

  ngOnInit(): void {
    this.createLoginForm();
    this.lang = localStorage.getItem('lang') || 'en';
  }

  createLoginForm() {
    this.signupForm = this.fb.group({
      userName: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
      password: new FormControl('', [Validators.required, Validators.minLength(4)]),
      repassword: new FormControl('', [Validators.required])
    },
      {
        validator: MustMatch("password", "repassword")
      });
  }

  signup() {// signup register
    this.loader = true;
    this.authService.register(this.signupForm.value).pipe(
      materialize(),
      delay(500),
      dematerialize(),
      finalize(
        () => this.loader = false),

    ).subscribe(
      () => {this.loginForm.emit(!this.toggleForm);this.successMessage()},
      (err) => this.alertifyService.error(err),
    );
  }
  gologin() {
    this.loginForm.emit(!this.toggleForm);
  }

  /// form method
  get username() {
    return this.signupForm.get('userName');
  }
  get email() {
    return this.signupForm.get('email');
  }
  get password() {
    return this.signupForm.get('password');
  }
  get rePassword() {
    return this.signupForm.get('repassword');
  }
  successMessage(){
    let mag=localStorage.getItem('lang')||'en'==='en'?'Success Register':'نجاح التسجيل';
    this.alertifyService.success(mag)
  }
  
}


