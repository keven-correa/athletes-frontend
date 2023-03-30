import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminServiceService } from 'src/app/administrador/services/admin-service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-actualizar-usuario',
  templateUrl: './actualizar-usuario.component.html',
  styleUrls: ['./actualizar-usuario.component.css']
})
export class ActualizarUsuarioComponent {

  id!:number;
  edad!:number;
  usuario:any;
  formulario!:FormGroup;

  mobileQuery: MediaQueryList; 

  private _mobileQueryListener: () => void;


  
ngOnDestroy(): void {
  this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  
    constructor(public dialog: MatDialog, private _ruta:ActivatedRoute,private fb:FormBuilder,
        private router:Router, private adminService:AdminServiceService,
       changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
  
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
  
  
     }
  
    ngOnInit(): void {
      this._ruta.params.subscribe(resp=>{
        this.id=resp['id'];
        
      })     
      this.formulario=this.fb.group({
        firstName: ['',Validators.required],
        lastName: ['',Validators.required],
        role: ['',Validators.required],
        password: ['',Validators.required],
        email: ['',Validators.required],             
      })       
      
      this.adminService.getUsuarioById(this.id).subscribe(resp=>{
        this.usuario=resp
        console.log(resp)
        this.formulario.patchValue({
          firstName:resp.firstName,
          lastName:resp.lastName,
          role:resp.role,
          email:resp.email,
          password:resp.password,
        })
      }, (error) => {
        // Manejo de errores HTTP
        if (error.status === 401) {
    
          this.mensajeError('Se ha producido un inconveniente al momento de la autenticacion, inicia sesion e intente de nuevo', 'error');
          this.adminService.logOut();
          this.router.navigate(['/login'])
    
        } else if (error.status === 403) {
    
          this.mensajeError('No tienes permiso para acceder a este componente.', 'warning');
          window.location.replace('/administrador/usuarios');
  
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


  Guardar(){
    console.log(this.formulario.value)
    this.adminService.actualizarUsuario(this.id,this.formulario.value).subscribe(resp=>{
      console.log(resp)
    }
    , (error) => {
      // Manejo de errores HTTP
      if (error.status === 401) {
  
        this.mensajeError('Se ha producido un inconveniente al momento de la autenticacion, inicia sesion e intente de nuevo', 'error');
        this.adminService.logOut();
        this.router.navigate(['/login'])
  
      } else if (error.status === 403) {
  
        this.mensajeError('No tienes permiso para acceder a este componente.', 'warning');
        window.location.replace('/administrador/usuarios');

      } else if (error.status === 404) {
        this.mensajeError('Recurso no encontrado.', 'warning');
  
      } else if (error.status === 500) {
        this.mensajeError('Error en el servidor, intente nuevamente.', 'warning');
  
      } else {
        this.mensajeError('Error desconocido.', 'warning');
      }
    }
    )
    this.usuariosR();
  }


  //Redireccionar en el menu
  usuariosR(){
    this.router.navigate(['/administrador/usuarios'])
  }  

       disciplina(){
        this.router.navigate(['/administrador/disciplinas'])
      }

 
  
  CerrarSesion(){

    this.adminService.logOut();
    this.router.navigate(['/login'])
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
