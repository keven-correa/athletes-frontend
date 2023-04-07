import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminServiceService } from '../../services/admin-service.service';

@Component({
  selector: 'app-nuevo-atleta',
  templateUrl: './nuevo-atleta.component.html',
  styleUrls: ['./nuevo-atleta.component.css']
})
export class NuevoAtletaComponent implements OnInit {

  formulario!:FormGroup;
  disciplinas:any


  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  constructor(public dialog: MatDialog,
    private fb:FormBuilder,
    private router:Router,
    private adminService:AdminServiceService,
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
        age: [0],
        dateOfBirth: ['',Validators.required],
        maritalStatus: ['',Validators.required],
        levelOfSchooling: ['Medio'],
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
        practiceHours: [0],
        practiceDays: [''],
        medicalInsurance: ['',Validators.required],
        studyHours: [0],
        studyDays: [''],
        TA: [''],
        FC: [''],
        FR: [''],      
    })

    this.adminService.getDisciplinas().subscribe(resp=>
      {
        this.disciplinas=resp
        console.log(resp)
      })
  }

 

  // foto(evento:any){
  //   this.formulario.controls['foto'].setValue(evento.target.files[0].name)
  // }

 //Navegar en el menu
 disciplina() {
  this.router.navigate(['/administrador/disciplinas'])
}

usuariosR() {
  this.router.navigate(['/administrador/usuarios'])
}

atletasR() {
  this.router.navigate(['/administrador/atletas'])
}

diagnosticosR() {
  this.router.navigate(['/administrador/diagnosticos'])
}
inicioR() {
  this.router.navigate(['/administrador/dashboard'])

}


  guardar(){
  this.adminService.guardarAtleta(this.formulario.value).subscribe(resp=>{
    console.log(resp)
  }
  , (error) => {
    // Manejo de errores HTTP
    if (error.status === 401) {

      this.mensajeError('Se ha producido un inconveniente al momento de la autenticacion, inicia sesion e intente de nuevo', 'error');
      this.adminService.logOut();

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


  guardarAtletaModal() {
    Swal.fire({
      title: '¿Desea guardar los datos?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Si',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Ejecutando función...');
        this.guardar();
        this.mensajeGuardado();
      }
    }).then(() => {
      console.log('Modal cerrado');
      // Lógica que se ejecuta al cerrar el modal
    });
  }

  mensajeGuardado() {
    Swal.fire({
      title: '¿Atleta registrado correctamente?',
      icon: 'success',
      showCancelButton: false,
      showConfirmButton:false,

    })
    setTimeout(() => {
    window.location.replace('/administrador/atletas');
      
    }, 3000);
  }

  CerrarSesion(){

    this.adminService.logOut();
  }


}
