import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../servicio/auth.service';
import { Router } from '@angular/router';
import { CustomValidators } from '../../../validators/custom-validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  formRegister: FormGroup;
  emailError: string | null = null; // Maneja el mensaje de error para el email

  constructor(private authService: AuthService, private router: Router, private fb: FormBuilder) {
    this.formRegister = this.fb.group({
      nombre: ['', [Validators.required, CustomValidators.nameValidator()]],
      email: ['', [Validators.required, CustomValidators.emailValidator()]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit() {
    this.emailError = null; 
    if (this.formRegister.valid) {
      this.authService.register(this.formRegister.value).subscribe(
        response => {
          console.log('Usuario registrado correctamente', response);
          this.router.navigate(['/login']);
        },
        error => {
          console.error('Error al registrar usuario', error);
          if (error.status === 400 && error.error?.message?.includes('email')) {
            this.emailError = 'El correo ingresado ya está registrado. Intenta con otro.';
          } else {
            this.emailError = 'Ocurrió un error al registrar. Intenta nuevamente.';
          }
          
        }
      );
    }
  }
}
