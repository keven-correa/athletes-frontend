import { MediaMatcher } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SecretariaService } from '../../services/secretaria.service';

interface ATL  {
  atleta:string,
  lugar:string

 }

@Component({
  selector: 'app-turnos',
  templateUrl: './turnos.component.html',
  styleUrls: ['./turnos.component.css']
}) 


export class TurnosComponent implements AfterViewInit {
  ELEMENT_DATA: any[] = [];

  atletas:any[]=[];
  turnosPendientes:ATL[] =[];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'atleta', 'lugar'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(public dialog: MatDialog,
    private fb:FormBuilder,
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

shouldRun = true;
  
  ngOnInit(): void {
    // this._secretariaService.ObtenerTurnos().subscribe(resp=>{
    //   this.turnosPendientes=resp
    //   
    //   
    // }) 
    this._secretariaService.getTurnos().subscribe(resp=>{
      this.ELEMENT_DATA=resp
      this.dataSource.data=this.ELEMENT_DATA
      console.log(resp)
    })
      
    }
   
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }
  

  crearTurno(){
    this.router.navigate(['/secretaria/nuevo-turno']);
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

    //redireccionar el menu
  atletasR(){
    this.router.navigate(['/secretaria/atletas'])
  }
  turnos(){
    this.router.navigate(['/secretaria/turnos'])
  }
    
  // obtenerTurnos(){
  //   this._secretariaService.ObtenerTurnos().subscribe(resp=>{
  //     this.atletas=resp
  //   })
  // }

    
}
