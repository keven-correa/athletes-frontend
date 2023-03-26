import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatBottomSheet, MAT_BOTTOM_SHEET_DATA } from "@angular/material/bottom-sheet";
import { SecretariaService } from '../../services/secretaria.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-turno',
  templateUrl: './nuevo-turno.component.html',
  styleUrls: ['./nuevo-turno.component.css']
})
export class NuevoTurnoComponent implements OnInit {
  formulario!: FormGroup;
  Turno: any = [];


  constructor(private _ruta: ActivatedRoute,
    @Inject(MAT_BOTTOM_SHEET_DATA) private data: any, private secretariaService: SecretariaService, private router: Router,
    private bottomSheet: MatBottomSheet,
    private fb: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      athlete: [this.data, Validators.required],
      status: [2, Validators.required],
      speciality: ['', Validators.required],
      remarks: ['', Validators.required],
    })
  }


  consulta() {
    this.formulario.patchValue({
      speciality: "MedicoGeneral",
    })

    this.secretariaService.AgregarTurno(this.formulario.value).subscribe(resp => {
      window.location.replace('/secretaria/turnos');

    }, (error) => {
      // Manejo de errores HTTP
      if (error.status === 401) {
  
        this.mensajeError('Se ha producido un inconveniente al momento de la autenticacion, inicia sesion e intente de nuevo', 'error');
        this.secretariaService.logOut();
        this.router.navigate(['/login'])
  
      } else if (error.status === 403) {
  
        this.mensajeError('No tienes permiso para acceder a este componente.', 'warning');
        window.location.replace('/secretaria/atletas');

      } else if (error.status === 404) {
        this.mensajeError('Recurso no encontrado.', 'warning');
  
      } else if (error.status === 500) {
        this.mensajeError('Error en el servidor, intente nuevamente.', 'warning');
  
      } else {
        this.mensajeError('Error desconocido.', 'warning');
      }
    }
    )

    this.bottomSheet.dismiss();

  }

  terapia() {
    this.formulario.patchValue({
      speciality: "Fisioterapeuta",
    })
    this.secretariaService.AgregarTurno(this.formulario.value).subscribe(resp => {

    }, (error) => {
      // Manejo de errores HTTP
      if (error.status === 401) {
  
        this.mensajeError('Se ha producido un inconveniente al momento de la autenticacion, inicia sesion e intente de nuevo', 'error');
        this.secretariaService.logOut();
        this.router.navigate(['/login'])
  
      } else if (error.status === 403) {
  
        this.mensajeError('No tienes permiso para acceder a este componente.', 'warning');
        window.location.replace('/secretaria/atletas');

      } else if (error.status === 404) {
        this.mensajeError('Recurso no encontrado.', 'warning');
  
      } else if (error.status === 500) {
        this.mensajeError('Error en el servidor, intente nuevamente.', 'warning');
  
      } else {
        this.mensajeError('Error desconocido.', 'warning');
      }
    }
    )

    this.bottomSheet.dismiss();
    window.location.replace('/secretaria/turnos');


  }

  mensajeError(mensaje: any, icono: any) {
    Swal.fire({
      title: mensaje,
      icon: icono,
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Ejecutando función...');
        // Lógica para ejecutar la función
      }
    }).then(() => {
      console.log('Modal cerrado');
      // Lógica que se ejecuta al cerrar el modal
    });
  }

}
