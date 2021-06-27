import { take, takeUntil } from 'rxjs/operators';
import { User } from './../../../core/models/user';
import { AuthService } from 'src/app/core/services/auth.service';
import { HttpEventType } from '@angular/common/http';
 import { OrderListDto } from './../../../core/models/Dtos/OrderListDto';
import { UserService } from 'src/app/core/services/user.service';
import { Component, OnInit, ViewChild, ElementRef, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
 import { Subject } from 'rxjs';
@Component({
  selector: 'eg-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.css']
})
export class AccountSettingsComponent implements OnInit,OnDestroy {
  selectedFile!: File;
  userOrder?: OrderListDto[];
  userOrderPagination: any = {};
  total: number = 0;
  arrayImage: any;
  formImage: any = {};
  progress!: number;
  message!: string;
  userPhoto!: string;
  uploadWidth: number = 0;
  showUpload = false;
  uploadMassage: string = '';
  notifier = new Subject();  // valiable destory
tab:any={}
  @ViewChild("iamgeUser") image!: ElementRef;
  constructor(private router: ActivatedRoute,
    private authService: AuthService,
     private userService: UserService) { }
  ngOnDestroy(): void {
    this.notifier.next();
    this.notifier.complete();
 }

  ngOnInit(): void {
    this.router.data.pipe(take(1)).subscribe(
      (data) => {
        this.userOrder = data["data"].result;
        this.userOrderPagination = data["data"].pagination;
      } );
    this.authService.userPhoto.pipe(takeUntil(this.notifier)).subscribe(
      (url) => { this.userPhoto = url; } );
      this.authService.lang.subscribe(
        (x)=>{
         if(x==='en')
         this.tab={account:'my data',orders:'orders',wishlist:'wishlist'}
         else
         this.tab={account:'بيانتى',orders:'الطلبات',wishlist:'المفضلة'}

        }
      )
  
  }
 

  saveChangeImage(file: any) {
    let fileUpload = <File>file[0];
    console.log(fileUpload);
    const formData = new FormData();
    formData.append('file', fileUpload, fileUpload.name);
    this.userService.changePhoto(formData).pipe(takeUntil(this.notifier)).subscribe(
      event => {
        this.showUpload = true;
        if (event.type === HttpEventType.UploadProgress) {
          this.uploadWidth = Math.round(100 * event.loaded / event.total!);
        }
        else if (event.type === HttpEventType.Response) {
          let user = event.body as User
          localStorage.setItem('user', JSON.stringify(user));
          this.authService.userUrl.next(user.photoUrl);
          this.uploadWidth = 0;
          this.showUpload = false;
          this.uploadMassage = 'success upload';
          this.messageFinish();
        }
      },
      (e) => {
        this.uploadMassage = 'fail  upload';
        this.messageFinish();
      }
    );
  }

  messageFinish() {
    setTimeout(
      () => this.uploadMassage = ''
      , 5000)
  }
 
 


}
