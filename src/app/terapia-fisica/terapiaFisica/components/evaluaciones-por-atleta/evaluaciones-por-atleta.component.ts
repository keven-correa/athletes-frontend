import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TerapiaFisicaService } from 'src/app/terapia-fisica/services/terapia-fisica.service';

@Component({
  selector: 'app-evaluaciones-por-atleta',
  templateUrl: './evaluaciones-por-atleta.component.html',
  styleUrls: ['./evaluaciones-por-atleta.component.css']
})
export class EvaluacionesPorAtletaComponent {
  id:any
  ELEMENT_DATA: any[] = [];

  mobileQuery: MediaQueryList; 

  private _mobileQueryListener: () => void;

  referimiento:any[]=[];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'fecha','mas'];
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
 this._ruta.params.subscribe((params:Params)=>{
   this.id=params['id'];
 })
  // this.terapiaFisicaService.Referimientos().subscribe(resp=>{
  //   this.ELEMENT_DATA=resp
  //   this.dataSource.data=this.ELEMENT_DATA
  //   console.log(resp)

  // })

  this.terapiaFisicaService.EvaluacionesPorAtleta(this.id).subscribe(resp=>{
    this.ELEMENT_DATA=resp
    this.dataSource.data=this.ELEMENT_DATA
    console.log(resp)
  })
    
     
  
}

envio(id:number){

  this.terapiaFisicaService.ConsultaDetalle(id).subscribe(resp=>{

    console.log(this.id)

    if(localStorage.getItem("idAtleta")){
      localStorage.removeItem("idAtleta")
    }{
      localStorage.setItem("idAtleta",this.id)
    }

  })
  console.log(id)
  this.router.navigate(['/terapia-fisica/evaluacion-Detalle', id])

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

}
