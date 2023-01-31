import { Component, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { TerapiaFisicaService } from '../../../services/terapia-fisica.service';

@Component({
  selector: 'app-terapia',
  templateUrl: './terapia.component.html',
  styleUrls: ['./terapia.component.css']
})
export class TerapiaComponent implements OnInit {
formulario!:FormGroup;

  id:number=1;
  terapias:any[]=[];

  constructor(private _router:Router, private _ruta:ActivatedRoute, private _terapiaFisicaService: TerapiaFisicaService, private fb:FormBuilder) { }

  ngOnInit(): void {
    // this._ruta.params.subscribe((params:Params)=>{
    //   this.id=params['id'];
    //   console.log(this.id)
    //   this.cargarDatosTerapia(this.id);
    // });
  }

  // cargarDatosTerapia(id:number){  
  //   this._terapiaFisicaService.ObtenerTerapias().subscribe(resp=>{
  //     const a = resp.filter(a=>a.idAtleta==this.id)
  //     console.log(resp)
  //     this.terapias= a;
  //     console.log(a)
      
      
  //   })
  // }

  evaluar(id:any){  
    this._router.navigate(['/terapia-fisica/terapia-detalle',this.id ])

  }
    
  }


