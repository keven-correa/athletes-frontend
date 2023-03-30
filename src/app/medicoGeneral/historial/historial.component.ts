import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MedicoGeneralService } from '../services/medico-general.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css'],
})
export class HistorialComponent implements OnInit {
  id: any;
  consultas: any[] = [];
  evaluaciones: any[] = [];

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private _ruta: ActivatedRoute,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    private medicoGeneralService: MedicoGeneralService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this._ruta.params.subscribe((params: Params) => {
      this.id = params['id'];
    });

    this.medicoGeneralService.ConsultaById(this.id).subscribe((resp) => {
      this.consultas = resp.reverse();
      console.log(resp);
    }, (error) => {
      // Manejo de errores HTTP
      if (error.status === 401) {
  
        this.mensajeError('Se ha producido un inconveniente al momento de la autenticacion, inicia sesion e intente de nuevo', 'error');
        this.medicoGeneralService.logOut();
        this.router.navigate(['/login'])
  
      } else if (error.status === 403) {
  
        this.mensajeError('No tienes permiso para acceder a este componente.', 'warning');
        this.atletasR();
      } else if (error.status === 404) {
        this.mensajeError('Recurso no encontrado.', 'warning');
  
      } else if (error.status === 500) {
        this.mensajeError('Error en el servidor, intente nuevamente.', 'warning');
  
      } else {
        this.mensajeError('Error desconocido.', 'warning');
      }
    }
    );

    this.medicoGeneralService.EvaluacionesPorAtleta(this.id).subscribe((resp) => {
      this.evaluaciones = resp.reverse();
      console.log(resp);
    });
  }

  detallesHistorial(id:any){
    this.router.navigate(['/medico-general/historial-detalle', id])

  }

  //Navegar en el menu
  turnos() {
    this.router.navigate(['/medico-general/turnos']);
  }

  atletasR() {
    this.router.navigate(['/medico-general/atletas']);
  }
  
  resumen(){
    this.router.navigate(['/medico-general/resumen'])

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
