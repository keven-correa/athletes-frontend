import { MediaMatcher } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SecretariaService } from '../../services/secretaria.service';
import { EditarTurnoComponent } from '../editar-turno/editar-turno.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
}) 


export class TurnosComponent implements AfterViewInit {
  ELEMENT_DATA: any[] = [];

  atletas:any[]=[];

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id','atleta', 'lugar', 'fecha', 'estado','editar'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(public dialog: MatDialog,
    private fb:FormBuilder,
    private router:Router,
    private bottomSheet:MatBottomSheet,
    private _secretariaService:SecretariaService,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher){

      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);

}

ngOnDestroy(): void {
  this.mobileQuery.removeListener(this._mobileQueryListener);
}


  
  ngOnInit(): void {

    this._secretariaService.getTurnos().subscribe(resp=>{
      // resp.sort((a:any, b:any) => new Date(a.createdat).getTime() - new Date(b.createdat).getTime());
      console.log(resp)
      this.ELEMENT_DATA = resp;
      this.dataSource.data = this.ELEMENT_DATA; 
    }, (error) => {
      // Manejo de errores HTTP
      if (error.status === 401) {
  
        this.mensajeError('Se ha producido un inconveniente al momento de la autenticacion, inicia sesion e intente de nuevo', 'error');
        this._secretariaService.logOut();
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
    );
    
      
    }
   
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }

  envio(id:number){
    this.router.navigate(['/secretaria/atleta-detalle', id])
    }

    EditarTurno(id:number){
      this.bottomSheet.open(EditarTurnoComponent,{
        data:id
      });
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    //redireccionar el menu
  atletasR(){
    this.router.navigate(['/secretaria/atletas'])
  }
  turnos(){
    this.router.navigate(['/secretaria/turnos'])
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
