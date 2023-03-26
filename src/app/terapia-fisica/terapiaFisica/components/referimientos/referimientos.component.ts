import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { ReferimientoService } from 'src/app/terapia-fisica/services/referimiento.service';
import { TerapiaFisicaService } from '../../../services/terapia-fisica.service';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-referimientos',
  templateUrl: './referimientos.component.html',
  styleUrls: ['./referimientos.component.css']
})
export class ReferimientosComponent implements OnInit {
  ELEMENT_DATA: any[] = [];

  mobileQuery: MediaQueryList; 

  private _mobileQueryListener: () => void;

  referimiento:any[]=[];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'name', 'lastName', 'discipline','date','mas'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);
  

constructor(public dialog: MatDialog,
  private _ruta:ActivatedRoute,
  private router:Router,
  private terapiaFisicaService:TerapiaFisicaService,
  changeDetectorRef: ChangeDetectorRef, media: MediaMatcher){

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  
}

ngOnDestroy(): void {
this.mobileQuery.removeListener(this._mobileQueryListener);
}



ngOnInit(): void {
//  this._ruta.params.subscribe((params:Params)=>{
//    this.id=params['id'];
//  })
  this.terapiaFisicaService.Referimientos().subscribe(resp=>{
    this.ELEMENT_DATA=resp
    this.dataSource.data=this.ELEMENT_DATA.reverse();
    console.log(resp)

    // const cantidad = this.ELEMENT_DATA.filter(a=>a.created_by.id==17      )

  }, (error) => {
    // Manejo de errores HTTP
    if (error.status === 401) {

      this.mensajeError('Se ha producido un inconveniente al momento de la autenticacion, inicia sesion e intente de nuevo', 'error');
      this.terapiaFisicaService.logOut();
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

envio(id:number){

  this.terapiaFisicaService.ConsultaDetalle(id).subscribe(resp=>{
    const respuesta= resp.athlete.id
    // console.log(respuesta)

    if(localStorage.getItem("idAtleta")){
      localStorage.removeItem("idAtleta")
    }{
      localStorage.setItem("idAtleta",respuesta)
    }

    // console.log(localStorage.getItem("idAtleta"))

  })
  this.router.navigate(['/terapia-fisica/evaluacion', id])

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
  this.router.navigate(['/terapia-fisica/turnos'])
}

atletasR(){
  this.router.navigate(['/terapia-fisica/atletas'])
}

referimientos(){
  this.router.navigate(['/terapia-fisica/referimientos'])

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
  






