import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LoginService } from '../../../servicio/login.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { CustomValidators } from '../../../validators/custom-validators';
import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  usuario: any[] = [];
  formLogin: FormGroup;

  constructor(
    private _loginService: LoginService,
    private route: Router
  ) {
    this.formLogin = new FormGroup({
      email: new FormControl(null, [Validators.required, CustomValidators.emailValidator()]),
      password: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.formLogin = new FormGroup({
      email: new FormControl(null, [Validators.required, CustomValidators.emailValidator()]),
      password: new FormControl(null, [Validators.required])
    });
  }

  login() {
    if (this.formLogin.valid) {
      console.log('Acceso', this.formLogin.valid);
      this._loginService.ingresar(this.formLogin.value)
        .subscribe({
          next: (respuesta) => {
            console.log('Se inició sesión correctamente', respuesta);
            this.route.navigate(['empleados']);
          },
          error: (err: HttpErrorResponse) => {
            console.error('Error al iniciar sesión', err);
            console.log('Detalles del error:', err.error);  // <-- Verifica qué responde el backend
            this.alertError();
          }
        });
    }
  }

  alertError() {
    const errorModalElement = document.getElementById('errorModal');
    if (errorModalElement) {
      const errorModal = new bootstrap.Modal(errorModalElement);
      const modalBody = errorModalElement.querySelector('.modal-body');
      if (modalBody) {
        modalBody.classList.add('shake');
        setTimeout(() => {
          modalBody.classList.remove('shake');
        }, 500);
      }
      errorModal.show();
    }
    this.formLogin.reset();
  }
}