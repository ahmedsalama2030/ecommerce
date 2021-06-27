import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { SocialAuthService } from 'angularx-social-login';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'eg-top-title',
  templateUrl: './top-title.component.html',
  styleUrls: ['./top-title.component.css']
})
export class TopTitleComponent implements OnInit {
  lang?: string;
  placeholderSearch: string = "Search Product";
  isLoggedIn?: boolean;
  constructor(
    public translate: TranslateService,
    public authService: AuthService,
  ) { }

  ngOnInit(): void {
    let lang = localStorage.getItem('lang') || 'en';
    console.log(lang);
    this.lang = lang==='en' ? 'العربية' : 'english';
    this.isLoggedIn = this.authService.loggedIn();
  }
  changeLang() {
    let lang = localStorage.getItem('lang') || 'en';
    let getlang = (lang === 'en') ? 'ar' : 'en';
    localStorage.setItem("lang", getlang)
    this.translate.use(getlang);
    this.authService.language.next(getlang);
    this.lang = lang==='en' ? 'english' : 'العربية';
  }


}
