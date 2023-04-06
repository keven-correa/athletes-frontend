import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminServiceService } from '../../services/admin-service.service';
import { NuevoDiagnosticoComponent } from '../nuevo-diagnostico/nuevo-diagnostico.component';
import { MatBottomSheet } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-diagnosticos',
  templateUrl: './diagnosticos.component.html',
  styleUrls: ['./diagnosticos.component.css']
})
export class DiagnosticosComponent {


  ELEMENT_DATA: any[] = [];
  disciplinas!: any[];

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'name', 'fecha',];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);


  constructor(private adminService: AdminServiceService,
    public dialog: MatDialog,
    private router: Router,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher,
    private bottomSheet: MatBottomSheet,

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
    this.adminService.getDiagnosticos().subscribe(resp => {
      console.log(resp)
      this.disciplinas = resp
      this.ELEMENT_DATA = resp
      this.dataSource.data = this.ELEMENT_DATA.reverse();
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
  }

  envio(id: number) {
    this.router.navigate(['/administrador/detallesUsuario', id])

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  nuevoDiagnostico() {
    // this.router.navigate(['/administrador/nuevoDiagnostico'])
    this.bottomSheet.open(NuevoDiagnosticoComponent, {
      // data:id
    });
  }

  Resumen() {
    this.router.navigate(['/administrador/reporteDisciplinas'])
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


  CerrarSesion() {

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
