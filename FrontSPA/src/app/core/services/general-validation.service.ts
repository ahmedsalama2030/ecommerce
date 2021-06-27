
import { Injectable } from '@angular/core';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class GeneralValidationService {

  constructor() { }

  textEmpty(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if(control.value===null) 
        return null;
       if (control.value.toString().trim() != '') {
        return null;
      } else {
        return { required: true };
      }
    }
  }
}

