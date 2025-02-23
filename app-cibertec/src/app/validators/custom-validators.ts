import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static emailValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!control.value || emailRegex.test(control.value)) {
        return null;
      }
      return { invalidEmail: true };
    };
  }

  static nameValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const nameRegex = /^[a-zA-Z\s]+$/;
      if (!control.value || nameRegex.test(control.value)) {
        return null;
      }
      return { invalidName: true };
    };
  }
}