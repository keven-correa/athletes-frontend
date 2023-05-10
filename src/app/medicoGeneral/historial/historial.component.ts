import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MedicoGeneralService } from '../services/medico-general.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import Swal from 'sweetalert2';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AtletaI } from 'src/app/shared/Models/atleta.interface';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css'],
})
export class HistorialComponent implements OnInit {
  id: any;
  consultas: any[] = [];
  evaluaciones: any[] = [];

  ELEMENT_DATA: AtletaI[] = [];

  atletaEnturno:any;

  mobileQuery: MediaQueryList; 

  private _mobileQueryListener: () => void;

  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = [ 'creadopor', 'fecha', 'diagnostico','mas'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);


  constructor(
    private _ruta: ActivatedRoute,
    public dialog: MatDialog,
    private router: Router,
    private medicoGeneralService: MedicoGeneralService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this._ruta.params.subscribe((params: Params) => {
      this.id = params['id'];
    });

    this.atletaEnturno = localStorage.getItem('NombreAtleta');


    this.medicoGeneralService.ConsultaById(this.id).subscribe((resp) => {
      this.ELEMENT_DATA=resp
      this.dataSource.data=this.ELEMENT_DATA.reverse();
      console.log(resp)
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
    );

    this.medicoGeneralService.EvaluacionesPorAtleta(this.id).subscribe((resp) => {
      this.evaluaciones = resp.reverse();
      // console.log(resp);
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  detallesHistorial(id:any){
    this.router.navigate(['/medico-general/historial-detalle', id])

  }

 
  //Navegar en el menu
  turnos() {
    this.router.navigate(['/medico-general/turnos'])
  }

  atletasR() {
    this.router.navigate(['/medico-general/atletas'])
  }
  inicioR() {
    this.router.navigate(['/medico-general/dashboard'])

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
