import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { GeneralValidationService } from 'src/app/core/services/general-validation.service';
import { UserService } from 'src/app/core/services/user.service';
 
@Component({
  selector: 'account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
     accountForm!:FormGroup;
     infoMessage:boolean=true;
     showMassageError?:boolean;
     loader:boolean=false;
     message='if you will not change password  do not change filed password(still empty)';
  constructor(
    private fb: FormBuilder,
    private userService:UserService,
    private validation:GeneralValidationService
      ) { }

  ngOnInit() {
    this.createLoginForm();
   this.accountForm.patchValue(JSON.parse(localStorage.getItem("user") !));
   }
   
 
   createLoginForm(){
    this.accountForm=this.fb.group({
      userName:new FormControl('',[Validators.required,this.validation.textEmpty()]),
      email:new FormControl('',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),this.validation.textEmpty()]),
      password:new FormControl('',[Validators.minLength(4)]),
      firstName:new FormControl('',[Validators.required,this.validation.textEmpty()]),
      id:new FormControl(''),
      lastName:new  FormControl('',[Validators.required,this.validation.textEmpty()]),
      middelName:new FormControl('',[Validators.required,this.validation.textEmpty()]),
      phoneNumber:new FormControl('',[Validators.required,this.validation.textEmpty()]),
      state:new FormControl('',[Validators.required,this.validation.textEmpty()]),
      street:new FormControl('',[Validators.required,this.validation.textEmpty()]),
      city:new FormControl('',[Validators.required,this.validation.textEmpty()]),

 
    } );
  }
  submit(){
    this.loader=true;
      this.userService.updateUser(this.accountForm.value).pipe(take(1)).subscribe(
     ()=>{
      this.infoMessage= this.showMassageError=false;
       localStorage.setItem('user',JSON.stringify(this.accountForm.value));
       this.message="success updated";
       this.loader=false;
     },
     (err)=>{
      this.showMassageError=true;
      this.message="error updated \n may be user name or email found another person";
      this.infoMessage=false;
      this.loader=false;

     }
     
    );  }
   // form 
    get userName(){
      return this.accountForm.get('userName');
     }
    get email(){
      return this.accountForm.get('email');
    }
    get password(){
       return this.accountForm.get('password');
    }
    get firstName(){
      return this.accountForm.get('firstName');
    } 
    get id(){
      return this.accountForm.get('id');
    }
    get lastName(){
      return this.accountForm.get('lastName');
    } 
    get middelName(){
      return this.accountForm.get('middelName');
    }
    get phoneNumber(){
      return this.accountForm.get('phoneNumber');
    }
    get state(){
      return this.accountForm.get('state');
    }
    get street(){
      return this.accountForm.get('street');
    }
    get city(){
      return this.accountForm.get('city');
    }
  
}
