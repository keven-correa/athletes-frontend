import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { TerapiaFisicaService } from '../../../services/terapia-fisica.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
})
export class TurnosComponent {

  
  ELEMENT_DATA: any[] = [];

  atletas:any[]=[];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['atleta', 'lugar', 'fecha', 'estado','editar','referimiento'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(public dialog: MatDialog,
    private fb:FormBuilder,
    private router:Router,
    private terapiafisicaService:TerapiaFisicaService,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher){

      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);

}

ngOnDestroy(): void {
  this.mobileQuery.removeListener(this._mobileQueryListener);
}  
  ngOnInit(): void {

    this.terapiafisicaService.getTurnos().subscribe(resp=>{
      this.ELEMENT_DATA = resp;
      this.dataSource.data = this.ELEMENT_DATA.reverse().filter(x=>x.speciality==="Fisioterapeuta").filter(a=>a.status==="2");
    }, (error) => {
      // Manejo de errores HTTP
      if (error.status === 401) {

        this.mensajeError('Se ha producido un inconveniente al momento de la autenticacion, inicia sesion e intente de nuevo', 'error');
        this.terapiafisicaService.logOut();
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
      
    }   
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }


  envio(id:number){
    this.terapiafisicaService.ObtenerTurnoById(id).subscribe(resp=>{
      console.log(resp.athleteid)

        const ActualizarTurno={
          status:1,
          speciality:"Fisioterapeuta",
          remarks:""
        }    
        this.terapiafisicaService.EditarTurno(id,ActualizarTurno).subscribe(resp=>{
          console.log(resp)
        })

        this.router.navigate(['/terapia-fisica/evaluaciones-atleta', id])

    })

    }

    envioReferimientos(id:number){
      this.terapiafisicaService.ObtenerTurnoById(id).subscribe(resp=>{
        console.log(resp.athleteid)
  
          const ActualizarTurno={
            status:1,
            speciality:"Fisioterapeuta",
            remarks:""
          }    
          this.terapiafisicaService.EditarTurno(id,ActualizarTurno).subscribe(resp=>{
            console.log(resp)
          })
  
          this.router.navigate(['/terapia-fisica/referimientos'])
  
      })
  
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
    this.router.navigate(['/medico-general/atletas'])
  }
  turnos(){
    this.router.navigate(['/medico-general/turnos'])
  }

  
referimientos(){
  this.router.navigate(['/terapia-fisica/referimientos'])

}
    
  CerrarSesion(){

    this.terapiafisicaService.logOut();
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
