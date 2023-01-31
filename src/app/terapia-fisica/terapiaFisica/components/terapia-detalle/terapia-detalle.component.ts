import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import {MatTable} from '@angular/material/table';
import { Params, ActivatedRoute } from '@angular/router';
import { TerapiaFisicaService } from '../../../services/terapia-fisica.service';

@Component({
  selector: 'app-terapia-detalle',
  templateUrl: './terapia-detalle.component.html',
  styleUrls: ['./terapia-detalle.component.css']
})
export class TerapiaDetalleComponent implements OnInit {
  id:any;
  formulario!:FormGroup;
  atletas:any;
  // terapias:any[]=[
  //   {nombre:'edgar',fecha:'22-5-2022'}
  // ];
  
  constructor(private fb:FormBuilder,
              private _ruta:ActivatedRoute, 
              private _terapiaFisicaService:TerapiaFisicaService) {
    
   }
  
  ngOnInit(): void {
    this._ruta.params.subscribe((params:Params)=>{
      this.id=params['id'];
    });
      this.formulario=this.fb.group({
        idAtleta:[this.id],
        nombre:['',Validators.required],
        edad:['',Validators.required],
        disciplina:['',Validators.required],
        apellido:['',Validators.required],
        fechaNacimiento:['',Validators.required],
        lugarNacimiento:['',Validators.required],
        sexo:['',Validators.required],
        dxMedico:['',Validators.required],
        dxterapeutico:['',Validators.required],
        dxHisEnfermedad:['',Validators.required],
        ROM:['',Validators.required],
        dolor:['',Validators.required],
        cantidadTerapia:['',Validators.required],
        observaciones:['']
  }  )

  // this.cargarDatos(this.id);
  console.log(this.atletas)
}




// cargarDatos(id:number){
  
//   const identificador:number=this.id;
//   this._terapiaFisicaService.ObtenerTerapias().subscribe(resp=>{
//     for (let i = 0; i < resp.length; i++) {
//       if(resp.find(item=>item.idAtleta==identificador)){
//         this.atletas=resp.find(item=>item.idAtleta==identificador)
//         return this.formulario.patchValue({          
//           nombre:this.atletas.nombre,
//           apellido:this.atletas.apellido,
//           edad:this.atletas.edad,
//           fechaNacimiento:this.atletas.fechaNacimiento,
//           lugarNacimiento:this.atletas.lugarNacimiento,
//           disciplina:this.atletas.disciplina,
//           sexo:this.atletas.sexo,
//           dxMedico:this.atletas.dxMedico,
//           dxterapeutico:this.atletas.dxterapeutico,
//           dxHisEnfermedad:this.atletas.dxHisEnfermedad,
//           ROM:this.atletas.ROM,
//           dolor:this.atletas.dolor,
//           cantidadTerapia:this.atletas.cantidadTerapia,
//           observaciones:this.atletas.observaciones
//         }) 
//       }      
//     }
//   })
// }


}


