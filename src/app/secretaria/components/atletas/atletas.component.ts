import {AfterViewInit, ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SecretariaService } from '../../services/secretaria.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { AtletaI } from '../../../shared/Models/atleta.interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-atletas',
  templateUrl: './atletas.component.html',
  styleUrls: ['./atletas.component.css']
})
export class AtletasComponent   implements AfterViewInit {
  ELEMENT_DATA: AtletaI[] = [];

  mobileQuery: MediaQueryList; 

  private _mobileQueryListener: () => void;

  atletas:any[]=[];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [ 'name', 'lastName', 'discipline','mas'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  constructor(public dialog: MatDialog,
              private router:Router,
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

    this._secretariaService.getAtletas().subscribe(resp=>{
      this.ELEMENT_DATA=resp
      this.dataSource.data=this.ELEMENT_DATA
    }, (error) => {
      // Manejo de errores HTTP
      if (error.status === 401) {
  
        this.mensajeError('Se ha producido un inconveniente al momento de la autenticacion, inicia sesion e intente de nuevo', 'error');
        this._secretariaService.logOut();
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
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }

  nuevoAtleta(){
    this.router.navigate(['/secretaria/nuevo-atleta'])
  }

  envio(id:number){
    this.router.navigate(['/secretaria/atleta-detalle', id])
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
    //Navegar en el menu
    turnos(){
      this.router.navigate(['/secretaria/turnos'])
    }

    atletasR(){
      this.router.navigate(['/secretaria/atletas'])
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