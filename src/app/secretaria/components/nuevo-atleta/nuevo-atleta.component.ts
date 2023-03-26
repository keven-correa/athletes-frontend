import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SecretariaService } from '../../services/secretaria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-nuevo-atleta',
  templateUrl: './nuevo-atleta.component.html',
  styleUrls: ['./nuevo-atleta.component.css']
})
export class NuevoAtletaComponent implements OnInit {

  formulario!:FormGroup;


  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  constructor(public dialog: MatDialog,
    private fb:FormBuilder,
    private router:Router,
    private secretariaService:SecretariaService,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher){
      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);


}
ngOnDestroy(): void {
  this.mobileQuery.removeListener(this._mobileQueryListener);
}

  ngOnInit(): void {
    this.formulario=this.fb.group({        
      name: ['',Validators.required],
        lastName: ['',Validators.required],
        document: ['',Validators.required],
        age: [0,Validators.required],
        dateOfBirth: ['',Validators.required],
        maritalStatus: ['',Validators.required],
        levelOfSchooling: ['Medio',Validators.required],
        address: ['',Validators.required],
        cell: ['',Validators.required],
        phone: ['',Validators.required],
        bloodType: ['',Validators.required],
        weight: [0,Validators.required],
        height: [0,Validators.required],
        disciplineId: ['',Validators.required],
        birthPlace: ['',Validators.required],
        gender: ['',Validators.required],
       // sportAge: ['',Validators.required],
        practiceHours: [0,Validators.required],
        practiceDays: ['',Validators.required],
        medicalInsurance: ['',Validators.required],
        studyHours: [0,Validators.required],
        studyDays: ['',Validators.required],
        TA: ['',Validators.required],
        FC: ['',Validators.required],
        FR: ['',Validators.required],      
    })
  }

 

  // foto(evento:any){
  //   this.formulario.controls['foto'].setValue(evento.target.files[0].name)
  // }

//redireccionar el menu
  atletas(){
    this.router.navigate(['/secretaria/atletas'])
  }
  turnos(){
    this.router.navigate(['/secretaria/turnos'])
  }

  guardar(){
  this.secretariaService.guardarAtleta(this.formulario.value).subscribe(resp=>{
    console.log(resp)
    this.atletas();   
  }
  , (error) => {
    // Manejo de errores HTTP
    if (error.status === 401) {

      this.mensajeError('Se ha producido un inconveniente al momento de la autenticacion, inicia sesion e intente de nuevo', 'error');
      this.secretariaService.logOut();
      this.router.navigate(['/login'])

    } else if (error.status === 403) {

      this.mensajeError('No tienes permiso para acceder a este componente.', 'warning');
      this.atletas();
    } else if (error.status === 404) {
      this.mensajeError('Recurso no encontrado.', 'warning');

    } else if (error.status === 500) {
      this.mensajeError('Error en el servidor, intente nuevamente.', 'warning');

    } else {
      this.mensajeError('Error desconocido.', 'warning');
    }
  })

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
