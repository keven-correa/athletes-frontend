import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TerapiaFisicaService } from 'src/app/terapia-fisica/services/terapia-fisica.service';
import { ReferimientoService } from '../../../services/referimiento.service';
// import { collection, getDocs, query, where } from "firebase/firestore";
// import { docData, Firestore, getDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css']
})
export class EvaluacionComponent implements OnInit {

id:number=0
formulario!:FormGroup;
atletas:any;
idAtleta:any;

constructor(private fb:FormBuilder,
            private _ruta:ActivatedRoute,
            private _terapiaFisicaService:TerapiaFisicaService,
            private router:Router) {

 }

  ngOnInit(){
  this._ruta.params.subscribe((params:Params)=>{
    this.id=params['id'];
    console.log(this.id)
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
    observaciones:[''],
  }) 
  // this.Cargar();
  // this.cargarDatosReferimiento(this.id);
  // this.cargarDatosConsulta(this.id);
  // this.cargarDatosPersonales(this.id);
}

Cargar (){

  const identificador:number=this.id;
  
  // this._terapiaFisicaService.ObtenerConsultas().subscribe(resp=>{
  //   for (let index = 0; index < resp.length; index++) {
  //     const element = resp[index];
  //     console.log(element.idAtleta)
      
  //   }
  // })
}


// cargarDatosPersonales(id:number){
  
//   const identificador:number=this.id;
//   this._terapiaFisicaService.ObtenerConsultas().subscribe(resp=>{
//     for (let i = 0; i < resp.length; i++) {
//       const element = resp[i];
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
//           dxMedico:this.atletas.dxMedico
//         }) 
//       }      
//     }
//   })
// }

// cargarDatosConsulta(id:number){
  
//   const identificador:number=this.id;
//   this._terapiaFisicaService.ObtenerConsultas().subscribe(resp=>{
//     console.log(resp)
//     const a =resp.find(consulta=>consulta.idAtleta=this.id)
//     console.log(a)
//      this.formulario.patchValue({
//           nombre:a.nombre,
//           apellido:a.apellido,
//           edad:a.edad,
//           fechaNacimiento:a.fechaNacimiento,
//           lugarNacimiento:a.lugarNacimiento,
//           disciplina:a.disciplina,
//           sexo:a.sexo,
//           dxMedico:a.dxMedico
//         }) 
//       } )
// }

// cargarDatosReferimiento(id:number){
//   const identificador:any=this.formulario.value;
//   this._terapiaFisicaService.ObtenerConsultas().subscribe(resp=>{
//     for (let i = 0; i < resp.length; i++) {
//       const element = resp[i];
//       if(resp.find(item=>item.idAtleta==identificador.idAtleta)){
//         this.referimiento=resp.find(item=>item.idAtleta==identificador)
//         console.log(this.referimiento)
//         return this.formulario.patchValue({
//           dxMedico:this.referimiento.dxMedico
//         }) 

//       }      
//     }

//   })

// }

guardar(){
  // this._terapiaFisicaService.AgregarTerapia(this.formulario.value);
  this.router.navigateByUrl("/terapia-fisica/atletas")
}

}
  
