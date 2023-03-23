import { AfterViewInit, Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TerapiaFisicaService } from '../../../services/terapia-fisica.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { AtletaI } from 'src/app/shared/Models/atleta.interface';


@Component({
  selector: 'app-atletas',
  templateUrl: './atletas.component.html',
  styleUrls: ['./atletas.component.css']
})
export class AtletasComponent implements  AfterViewInit {
  ELEMENT_DATA: AtletaI[] = [];

  mobileQuery: MediaQueryList; 

  private _mobileQueryListener: () => void;

  atletas:any[]=[];
  
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'name', 'lastName', 'discipline','mas'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  constructor(public dialog: MatDialog,
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

  shouldRun = true;

  
  
  ngOnInit(): void {

    this.terapiaFisicaService.getAtletas().subscribe(resp=>{
      this.ELEMENT_DATA=resp
      this.dataSource.data=this.ELEMENT_DATA
      //console.log(this.ELEMENT_DATA)
    })
  }
  
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }

  // nuevoAtleta(){
  //   this.router.navigate(['/secretaria/nuevo-atleta'])
  // }

  envio(id:number){
    this.router.navigate(['/terapia-fisica/atleta-detalle', id])
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
