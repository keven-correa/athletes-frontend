import { Component, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheet } from '@angular/material/bottom-sheet';
import { ActivatedRoute, Router } from '@angular/router';
import { SecretariaService } from '../../services/secretaria.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-editar-turno',
  templateUrl: './editar-turno.component.html',
  styleUrls: ['./editar-turno.component.css']
})
export class EditarTurnoComponent {

  formulario!:FormGroup;  
  Turno:any =[];

  turno:any

  constructor(private _ruta:ActivatedRoute,
    @Inject(MAT_BOTTOM_SHEET_DATA) private data:any, private secretariaService:SecretariaService, private router:Router,
    private bottomSheet:MatBottomSheet,
    private fb:FormBuilder,
    ) { }

    ngOnInit(): void {
      this.formulario=this.fb.group({        
        status: [0,Validators.required],
        speciality: [0,Validators.required],
        remarks: ['',Validators.required],          
      })


    }

    Eliminar(){
      this.secretariaService.EliminarTurno(this.data).subscribe(resp=>{
        console.log(resp)
window.location.replace('/secretaria/turnos');   


      })
    this.bottomSheet.dismiss();

    }

    cambioEspecialista(){
      this.secretariaService.ObtenerTurnoById(this.data).subscribe(resp=>{
        console.log(resp)
        this.Turno=resp;
        if(resp.speciality=="Fisioterapeuta"){
          this.formulario.patchValue({
            speciality:"MedicoGeneral",
            status: Number(resp.status)
          })
          this.secretariaService.EditarTurno(this.data,this.formulario.value).subscribe(resp=>{
            console.log(resp)
          })

        }
        else{
          this.formulario.patchValue({
            speciality:"Fisioterapeuta",
            status: Number(resp.status)
          })
          this.secretariaService.EditarTurno(this.data,this.formulario.value).subscribe(resp=>{
            console.log(resp)
          })         
        }
       window.location.replace('/secretaria/turnos');   


      }, (error) => {
        // Manejo de errores HTTP
        if (error.status === 401) {
    
          this.mensajeError('Se ha producido un inconveniente al momento de la autenticacion, inicia sesion e intente de nuevo', 'error');
          this.secretariaService.logOut();
          this.router.navigate(['/login'])
    
        } else if (error.status === 403) {
    
          this.mensajeError('No tienes permiso para acceder a este componente.', 'warning');
          this.router.navigate(['/secretaria/atletas']);

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
