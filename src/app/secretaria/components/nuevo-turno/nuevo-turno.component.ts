import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {  MatBottomSheet, MAT_BOTTOM_SHEET_DATA } from "@angular/material/bottom-sheet";
import { SecretariaService } from '../../services/secretaria.service';

@Component({
  selector: 'app-nuevo-turno',
  templateUrl: './nuevo-turno.component.html',
  styleUrls: ['./nuevo-turno.component.css']
})
export class NuevoTurnoComponent implements OnInit {

  Turno:any =[];
  constructor(private _ruta:ActivatedRoute,
    @Inject(MAT_BOTTOM_SHEET_DATA) private data:any, private secretariaService:SecretariaService, private router:Router,
    private bottomSheet:MatBottomSheet) { }

  ngOnInit(): void {
    // this._ruta.params.subscribe((params:Params)=>{
    //   this.id=params['id'];
    //   console.log(this.id)
    // })

  }

  consulta(){
    this.Turno={
      atleta:this.data,
      lugar:'Consulta'
    }
    // this.secretariaService.AgregarTurno(this.Turno);
    this.bottomSheet.dismiss();
    this.router.navigate(['/secretaria/turnos']);
    //console.log(this.Turno)
  }

  terapia(){
    this.Turno={
      atleta:this.data,
      lugar:'Terapia'
    }
    // this.secretariaService.AgregarTurno(this.Turno);
    this.bottomSheet.dismiss();
    this.router.navigate(['/secretaria/turnos'])

    
  }

}
