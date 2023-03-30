import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TerapiaFisicaService } from '../../../services/terapia-fisica.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-atleta-detalle',
  templateUrl: './atleta-detalle.component.html',
  styleUrls: ['./atleta-detalle.component.css']
})
export class AtletaDetalleComponent implements OnInit {

  id:number=0;
  edad!:number;
  atletas!:any;
  fechaAtleta!:any;

mobileQuery: MediaQueryList; 

private _mobileQueryListener: () => void;

constructor(public dialog: MatDialog,
  private _ruta:ActivatedRoute,
  private router:Router,
  private terapiaFisicaService:TerapiaFisicaService,
  changeDetectorRef: ChangeDetectorRef, media: MediaMatcher){

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  
}

ngOnDestroy(): void {
this.mobileQuery.removeListener(this._mobileQueryListener);
}

shouldRun = true;

ngOnInit(): void {
 this._ruta.params.subscribe((params:Params)=>{
   this.id=params['id'];
 })
  this.terapiaFisicaService.detalleAtleta(this.id).subscribe(resp=>{
    this.atletas = resp;
    this.edadAtleta();     
  }, (error) => {
    // Manejo de errores HTTP
    if (error.status === 401) {

      this.mensajeError('Se ha producido un inconveniente al momento de la autenticacion, inicia sesion e intente de nuevo', 'error');
      this.terapiaFisicaService.logOut();
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

// Fecha de nacimiento a edad
edadAtleta(){
  const calculateAge = (birthday:any) => {
    const ageDifMs = Date.now() - new Date(birthday).getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}
var dia = this.atletas.dateOfBirth.toString().substring(0,10);
this.edad=(calculateAge(dia))

this.fechaAtleta = this.atletas.dateOfBirth.toString().substring(0,10);
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
resumen(){
  this.router.navigate(['/terapia-fisica/resumen'])

}

terapia(id:any){
  this.router.navigate(['terapia-fisica/terapia',this.id])
}

 consulta(id:number){
  this.router.navigate(['/medico-general/consulta-atleta', this.id])
 }

 historial(id:number){
  this.router.navigate(['/terapia-fisica/historial', this.id])
 }

 evaluaciones(){
  this.router.navigate(['/terapia-fisica/evaluaciones-atleta', this.id])
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
