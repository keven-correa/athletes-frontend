import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MedicoGeneralService } from '../services/medico-general.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-consulta-atleta',
  templateUrl: './consulta-atleta.component.html',
  styleUrls: ['./consulta-atleta.component.css']
})
export class ConsultaAtletaComponent implements OnInit {

  id:number=0;
  atletas!:any;
  formulario!:FormGroup;
  formularioTurno!:FormGroup;

  
  mobileQuery: MediaQueryList; 
  private _mobileQueryListener: () => void;

  constructor(private _ruta:ActivatedRoute,
    public dialog: MatDialog,
    private fb:FormBuilder,
    private router:Router,
    private medicoGeneralService:MedicoGeneralService,
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

    this.formularioTurno = this.fb.group({
      athlete: [this.id, Validators.required],
      status: [2, Validators.required],
      speciality: ['Fisioterapeuta', Validators.required],
      remarks: ['Referimiento de medico', Validators.required],
    })

    this.medicoGeneralService.detalleAtleta(this.id).subscribe(resp=>{
      this.atletas=resp
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
    )

    //Convertir el id a int
    let identificador = Number(this.id)

    this.formulario=this.fb.group({       
      reason: ['',Validators.required],      
      diagnostic: ['',Validators.required],      
      notes: ['',Validators.required],      
      priority: ['Media',Validators.required],      
      athlete: [identificador,Validators.required],      
      // assigned_to: [2,Validators.required],      
    })
     
   }  

enviar(){
  console.log(this.formulario.value)
  this.medicoGeneralService.NuevaConsulta(this.formulario.value).subscribe(resp=>{

    this.medicoGeneralService.AgregarTurno(this.formularioTurno.value).subscribe(resp1 => {
        console.log(resp1)

    })
    this.atletasR();
  }
  )


}


    //Navegar en el menu
    turnos(){
      this.router.navigate(['/medico-general/turnos'])
    }

    atletasR(){
      this.router.navigate(['/medico-general/atletas'])
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
