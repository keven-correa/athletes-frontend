import { MediaMatcher } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminServiceService } from '../../services/admin-service.service';
import { filter } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements AfterViewInit {
  ELEMENT_DATA: any[] = [];
  usuarios!:any[];

  mobileQuery: MediaQueryList; 

  private _mobileQueryListener: () => void;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [ 'firstName', 'lastName', 'role','estado','cambioEstado'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);


  constructor(private adminService:AdminServiceService,
    public dialog: MatDialog,
              private router:Router,
              changeDetectorRef: ChangeDetectorRef, media: MediaMatcher    
    ) { 

      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnDestroy(): void {
      this.mobileQuery.removeListener(this._mobileQueryListener);
    }

    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
  
    }

  ngOnInit(): void {
    this.adminService.getUsuarios().subscribe(resp=>{
      this.usuarios=resp
      this.ELEMENT_DATA=resp
      this.dataSource.data=this.ELEMENT_DATA;
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

  envio(id:number){
    this.router.navigate(['/administrador/detallesUsuario',id])
    // let nuevoestado=
    // {
    //   "isActive":true
    // }
    // let estado= this.usuarios.find(a=>a.id === id)
    //  console.log(estado)
    // if(estado.isActive==true){
    //   nuevoestado={
    //     "isActive":false
    //   }
    // }else if(estado.isActive==false){
    //   nuevoestado={
    //     "isActive":true
    //   }
    // }    
    // console.log(nuevoestado)
    // this.adminService.actualizarEstadoUsuario(id, nuevoestado).subscribe(resp=>{
    //   console.log(resp)
    //   window.location.replace('/administrador/usuarios')
    // })


    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    nuevoUsuario(){
      this.router.navigate(['/administrador/nuevo-usuario'])
    }

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
