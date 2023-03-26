import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { LoginI } from '../../../shared/Models/login.interface';
import { ResponseI } from '../../../shared/Models/response.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  formulario!: FormGroup;
  mensaje: boolean = false;
  data: any[] = [];

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private loginservice: LoginService
  ) {}

  ngOnInit(): void {
    this.formulario = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  login() {
    // console.log(this.formulario.value)
    const body = {
      email: this.formulario.value.email,
      password: this.formulario.value.password,
    };
    this.loginservice.getUsuarios(body).subscribe((data) => {
      const respuesta: any = data;
        if (respuesta.role == 'Administrator') {
          localStorage.setItem('token', respuesta.token);

          // this.router.navigateByUrl('/secretaria/atletas')
          window.location.replace('/administrador/usuarios');
        } else if (respuesta.role == 'Secretary') {
          localStorage.setItem('token', respuesta.token);

          window.location.replace('/secretaria/atletas');
        } else if (respuesta.role == 'MedicoGeneral') {
          localStorage.setItem('token', respuesta.token);

          window.location.replace('/medico-general/atletas');
        } else if (respuesta.role == 'Fisioterapeuta') {
          localStorage.setItem('token', respuesta.token);
          localStorage.setItem('idTerapeuta', respuesta.id);

          window.location.replace('/terapia-fisica/atletas');
        }
      
    },(error) => {
      // Manejo de errores HTTP
      if (error.status === 401) {
        console.log('Error: Autenticación fallida');
      } else if (error.status === 403) {
        console.log('Error: Acceso denegado');
      } else if (error.status === 404) {
        console.log('Error: Recurso no encontrado');
      } else if (error.status === 500) {
        console.log('Error: Error interno del servidor');
      } else {
        console.log('Error desconocido');
      }
      
      // Mostrar mensaje de error en la interfaz de usuario
      this.mensajeError();
    }
    )   ;
  }

  mensajeError() {
    this.mensaje = true;
    setTimeout(() => {
      this.mensaje = false;
    }, 2000);
    return;
  }
}
