import { Directive } from '@angular/core';
import { AbstractControl, ValidationErrors } from '@angular/forms';
import { GeneralValidationService } from 'src/app/core/services/general-validation.service';

@Directive({
  selector: '[SpaceValidator]'
})
export class SpaceValidatorDirective {

   constructor(private generalValidationService:GeneralValidationService) {}
  validate(control: AbstractControl): ValidationErrors | null {
    return this.generalValidationService.textEmpty()(control);    

  }
}
