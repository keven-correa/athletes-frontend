import {AfterViewInit, Component, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { Router } from '@angular/router';


export interface atleta {
  nombre: string;
  id: number;
  apellido: string;
  disciplina: string;
  sexo:string;
}

const ELEMENT_DATA: atleta[] = [
  {id: 1, nombre: 'Antonio', apellido:'Guzman' , disciplina: 'Boxeo', sexo:'M'},
  {id: 2, nombre: 'Manuel', apellido: 'Gonzalez' , disciplina: 'Basketball', sexo:'M'},
  {id: 3, nombre: 'Juana', apellido: 'Castillo', disciplina: 'Baseball', sexo:'F'},
  {id: 4, nombre: 'Saldy', apellido:'Amparo' , disciplina: 'Voleibol', sexo:'F'},
  {id: 5, nombre: 'Nicol', apellido: 'Borbon' , disciplina: 'Atletismo', sexo:'F'},
  {id: 6, nombre: 'Keven', apellido: 'Correa', disciplina: 'Natacion', sexo:'M'},
  {id: 7, nombre: 'Edgar', apellido: 'Mena', disciplina: 'Natacion', sexo:'M'},
  {id: 8, nombre: 'Julia', apellido: 'Ruiz', disciplina: 'Boxeo', sexo:'F'},
  {id: 9, nombre: 'Joan', apellido:'Sena' , disciplina: 'Judo', sexo:'M'},
  {id: 10, nombre: 'Daniel', apellido: 'Perez', disciplina: 'Boxeo', sexo:'M'},
  
];


@Component({
  selector: 'app-consultas',
  templateUrl: './consultas.component.html',
  styleUrls: ['./consultas.component.css']
})
export class ConsultasComponent  implements AfterViewInit {
  displayedColumns: string[] = ['id', 'nombre', 'apellido', 'disciplina', 'consulta'];
  dataSource = new MatTableDataSource<atleta>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(public dialog: MatDialog, private router:Router){

  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }




openDialog(id:number) {
  this.dialog.open(DialogComponent);
  
}
  
    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

  envio(id:number){
  this.router.navigate(['/medico-general/consulta-detalle', id])
  }
    
}