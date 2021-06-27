import { AlertifyService } from './../../../core/services/alertify.service';
import {
  Component,
  AfterViewInit,
  OnDestroy,
  ViewChild,
  ElementRef,
  ChangeDetectorRef, OnInit, Output, EventEmitter, Input
} from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { OrderService } from 'src/app/core/services/order.service';
import { take } from 'rxjs/operators';
import { RegisterOnlineOrderDto } from 'src/app/core/models/Dtos/RegisterOnlineOrderDto';
import { PaymentDto } from 'src/app/core/models/Dtos/PaymentDto';


@Component({
  selector: 'eg-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild('cardInfo') cardInfo: ElementRef | undefined;
  @Output() successPaid = new EventEmitter<boolean>();
  @Input() totalPrice?: number;
  card: any;
  cardHandler = this.onChange.bind(this);
  error: any;
  loader: boolean = false;
  loaderOnDelivery: boolean = false;
  loaderDelivery: boolean = false;
  orderInfo: any;
  orderId?: string;
  message: string = '';
   constructor(
    private cd: ChangeDetectorRef,
    public authService: AuthService,
     private router: Router,
     private alertifyService: AlertifyService,
     private location: Location,
    private orderService: OrderService) { }

  ngAfterViewInit() {
    const style = {
      base: {
        fontFamily: 'inherit',
        fontSmoothing: 'antialiased',
        fontSize: '21px',
      }
    };
    this.card = elements.create('card', { hidePostalCode: false, style: style });
    this.card.mount(this.cardInfo?.nativeElement);
    this.card.addEventListener('change', this.cardHandler);

  }
  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }
  ngOnInit() {  }
  onChange({ error }: { error: any }) {
    if (error) {
      this.error = error.message;
      this.cardMessage();
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  cardMessage() {
    this.message = this.authService.dir === 'ltr' ? "card input error" : "خطأ فى إدخال الكارت";
    setTimeout(() => {
      this.message = ''
    }, 5000);
  }

  async onSubmit() {
    const { token, error } = await stripe.createToken(this.card);
    if (error)
      this.cardMessage();
    else { 
      
      this.orderService.registerOnline(token.id.toString()).pipe(take(1)).subscribe(
        (res: any) => { 
          this.loader = false;
          this.authService.cartBehavior.next(0);
          this.successPaid.emit(true);
          },  
        (err) => { this.errorMessage() }
      );
    } 
  }

  loadPayOnline() {
    if (this.error === null)
      this.loader = true;
    else this.loader = false;
  }
  
  loadDelivery() {
    
    this.loaderOnDelivery = true;
    this.orderService.register().pipe(take(1)).subscribe(
      (res: any) => {
        this.orderId = res.id;
        this.successPaid.emit(true);
        this.loaderOnDelivery = false;
        this.authService.cartBehavior.next(0);
        setTimeout(() => {
          this.router.navigate(['/shoping-filter']);
        }, 5000);
      },
      (err) => { this.errorMessage() }
    );
  } 
  errorMessage() {   
    let message = this.authService.dir === 'ltr' ? "fail to send" : "فشل فى الأرسال";
    this.loader = false;
    this.loaderOnDelivery = false;
    this.alertifyService.error(message);
  }
}

