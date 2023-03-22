import { Component, OnInit } from '@angular/core';
import { MedicoGeneralService } from '../services/medico-general.service';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  id:any
  consultas:any []=[];
  constructor(private _ruta:ActivatedRoute,private medicoGeneralService:MedicoGeneralService) { }

  ngOnInit(): void {
    this._ruta.params.subscribe((params:Params)=>{
      this.id=params['id'];
    });

    this.medicoGeneralService.ConsultaById(this.id).subscribe(resp=>{
      this.consultas=resp
      console.log(resp)
    })
  }

}
