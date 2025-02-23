import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../../servicio/empleado.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { LoginService } from '../../servicio/login.service';
import { Router } from '@angular/router';

declare var bootstrap: any;

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css'],
})
export class EmpleadosComponent implements OnInit {

  listaEmpleados: any[] = [];
  formEmpleado: FormGroup;
  title: string = '';
  nameBoton: string = '';
  id!: number;
  horaActual: string = '';

  constructor(
    private empleadoService: EmpleadoService,
    private loginService: LoginService,
    private router: Router
  ) {
    this.formEmpleado = new FormGroup({
      nombre: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')
      ]),
      apellido: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$')
      ]),
      puesto: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚñÑ ]+$') 
      ]),
      salario: new FormControl(null, [
        Validators.required,
        Validators.pattern('^[0-9]+(\\.[0-9]{1,2})?$'),
        (control) => control.value !== null && control.value < 0 ? { salarioNegativo: true } : null
      ])
    });
  }

  ngOnInit(): void {
    this.obtenerEmpleados();
    this.actualizarHora();
    setInterval(() => this.actualizarHora(), 1000);
  }

  actualizarHora(): void {
    const ahora = new Date();
    const horas = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    const segundos = ahora.getSeconds().toString().padStart(2, '0');
    this.horaActual = `${horas}:${minutos}:${segundos}`;
  }

  obtenerEmpleados(): void {
    this.empleadoService.listarEmpleados().subscribe(
      (data: any) => {
        this.listaEmpleados = Array.isArray(data.empleados) ? data.empleados : [];
      },
      (error) => console.error('Error al obtener empleados', error)
    );
  }

  registrarEmpleado(): void {
    if (this.formEmpleado.valid) {
      this.empleadoService.crearEmpleado(this.formEmpleado.value).subscribe(
        () => {
          this.cerrarModal();
          this.obtenerEmpleados();
          this.resetForm();
          this.alertaExitosa('registrado');
        },
        (error) => console.error('Error al registrar empleado', error)
      );
    }
  }

  editarEmpleado(): void {
    if (this.formEmpleado.valid) {
      this.empleadoService.editarEmpleado(this.id, this.formEmpleado.value).subscribe(
        () => {
          this.cerrarModal();
          this.obtenerEmpleados();
          this.resetForm();
          this.alertaExitosa('modificado');
        },
        (error) => console.error('Error al modificar empleado', error)
      );
    }
  }

  eliminarEmpleado(id: number): void {
    Swal.fire({
      title: '¿Estás seguro de eliminar el empleado?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.empleadoService.eliminarEmpleado(id).subscribe(
          () => {
            this.listaEmpleados = this.listaEmpleados.filter(emp => emp.id !== id);
            this.alertaExitosa('eliminado');
          },
          (error) => console.error('Error al eliminar empleado', error)
        );
      }
    });
  }

  titulo(titulo: string, id?: number): void {
    this.title = `${titulo} empleado`;
    this.nameBoton = titulo === 'Crear' ? 'Guardar' : 'Modificar';
    if (id != null) {
      this.id = id;
      this.obtenerEmpleadoPorId(id);
    } else {
      this.resetForm();
    }
  }

  obtenerEmpleadoPorId(id: number): void {
    this.empleadoService.obtenerEmpleadoPorId(id).subscribe(
      (data: any) => {
        const empleado = data.empleado;  
        this.formEmpleado.patchValue({
          nombre: empleado.nombre,
          apellido: empleado.apellido,
          puesto: empleado.puesto,
          salario: empleado.salario
        });
      }
    );
  }

  crearOActualizarEmpleado(): void {
    const accion = this.nameBoton === 'Guardar' ? 'registrar' : 'modificar';
    this.alertaConfirmacion(accion, () => {
      this.nameBoton === 'Guardar' ? this.registrarEmpleado() : this.editarEmpleado();
    });
  }

  alertaConfirmacion(accion: string, callback: () => void): void {
    Swal.fire({
      title: `¿Estás seguro de ${accion} el empleado?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: `Sí, ${accion}`,
      cancelButtonText: 'Cancelar'
    }).then((result) => result.isConfirmed && callback());
  }

  alertaExitosa(accion: string): void {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: `Empleado ${accion}`,
      showConfirmButton: false,
      timer: 1500
    });
  }

  cerrarModal(): void {
  const modalElement = document.getElementById('modalEmpleado');
  if (modalElement) {
    const modal = bootstrap.Modal.getInstance(modalElement) ?? new bootstrap.Modal(modalElement);
    modal.hide();
  }

  document.querySelectorAll('.modal-backdrop').forEach((backdrop) => backdrop.remove());
  document.body.classList.remove('modal-open');
  document.body.style.removeProperty('padding-right'); 
}

  resetForm(): void {
    this.formEmpleado.reset();
  }

  logout(): void {
    Swal.fire({
      title: '¿Estás seguro de cerrar sesión?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Sí',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loginService.logout();
        this.router.navigate(['login']);
      }
    });
  }
}
