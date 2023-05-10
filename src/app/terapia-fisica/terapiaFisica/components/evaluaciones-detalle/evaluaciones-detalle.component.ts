import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TerapiaFisicaService } from '../../../services/terapia-fisica.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-evaluaciones-detalle',
  templateUrl: './evaluaciones-detalle.component.html',
  styleUrls: ['./evaluaciones-detalle.component.css']
})
export class EvaluacionesDetalleComponent {

  detallesEvaluacion:any
  id:number=0;
  idTerapeuta:any= localStorage.getItem('idTerapeuta');
  formulario!:FormGroup;
  consulta!:any;

  atletaEnturno:any;
mobileQuery: MediaQueryList; 

private _mobileQueryListener: () => void;

@ViewChild(MatPaginator) paginator!: MatPaginator;

constructor(private fb:FormBuilder,
  public dialog: MatDialog,
            private _ruta:ActivatedRoute,
            private _terapiaFisicaService:TerapiaFisicaService,
            private router:Router,
            changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {

              this.mobileQuery = media.matchMedia('(max-width: 600px)');
              this._mobileQueryListener = () => changeDetectorRef.detectChanges();
              this.mobileQuery.addListener(this._mobileQueryListener);
 }

  ngOnInit(){
  this._ruta.params.subscribe((params:Params)=>{
    this.id=params['id'];    
  });

  this.atletaEnturno = localStorage.getItem('NombreAtleta');

  
this._terapiaFisicaService.ConsultaDetalle(this.id).subscribe(resp=>{
  this.consulta=resp; 
},(error) => {
  // Manejo de errores HTTP
  if (error.status === 401) {
    console.log();
  this.mensajeError('Error: Autenticación fallida','warning');
    this._terapiaFisicaService.logOut();
this.router.navigate(['/login'])

  } else if (error.status === 403) {
    console.log();
  this.mensajeError('Error: Acceso denegado','warning');

  } else if (error.status === 404) {
    console.log('Error: Recurso no encontrado');
  } else if (error.status === 500) {
    console.log('Error: Error interno del servidor');
  } else {
    console.log('Error desconocido');
  }
}
)
  this.formulario=this.fb.group({    
    therapeuticDiagnosis:['',Validators.required],
    treatment:['',Validators.required],
    ROM:[0,Validators.required],
    remarks:['',Validators.required],
    painLevel:['',Validators.required],
    numberOfTherapies:['',Validators.required],
    athlete:[Number(localStorage.getItem("idAtleta")),Validators.required],    
  }) 

      this._terapiaFisicaService.EvaluacionDetalle(this.id).subscribe(resp=>{
      this.detallesEvaluacion=resp     
    }, (error) => {
      // Manejo de errores HTTP
      if (error.status === 401) {

        this.mensajeError('Se ha producido un inconveniente al momento de la autenticacion, inicia sesion e intente de nuevo', 'error');
        this._terapiaFisicaService.logOut();
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
    ) 

}

ngOnDestroy(): void {
  this.mobileQuery.removeListener(this._mobileQueryListener);
}


 //Navegar en el menu
 turnos(){
  this.router.navigate(['/terapia-fisica/turnos'])
}

atletasR(){
  this.router.navigate(['/terapia-fisica/atletas'])
}

referimientos(){
  this.router.navigate(['/terapia-fisica/referimientos'])

}
inicioR(){
  this.router.navigate(['/terapia-fisica/dashboard'])

}

   nuevaTerapia(){
    if(localStorage.getItem("InicioConsulta")){
      localStorage.removeItem("InicioConsulta");
      localStorage.setItem("InicioConsulta",String(new Date()))
    }else{
      localStorage.setItem("InicioConsulta",String(new Date()))
    }
    this.router.navigate(['terapia-fisica/nueva-terapia',this.id])
   }


   mensajeError(mensaje:any, icono:any) {
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
