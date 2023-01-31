import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MedicoGeneralService } from '../services/medico-general.service';
// import { collection } from '@firebase/firestore';
// import { Firestore, query, where } from '@angular/fire/firestore';
import { getLocaleDateFormat } from '@angular/common';

interface Atleta{
  id:number;
  nombre:string;
  apellido:string;
  disciplina:string;
  edad:number;
  sexo:string;
  fechaNacimiento:string;
  lugarNacimiento:string;
}

interface Referimiento{
  id:number;
  idAtleta:number;
  atendidoPor:string;
  referidoPor:string;
  dxMedico:string;
  fecha:string;
}

@Component({
  selector: 'app-consulta-atleta',
  templateUrl: './consulta-atleta.component.html',
  styleUrls: ['./consulta-atleta.component.css']
})
export class ConsultaAtletaComponent implements OnInit {

  id:number=0;
  formulario!:FormGroup;
  atletas:Atleta;
  fecha: any;

  constructor(private _ruta:ActivatedRoute,
              private router:Router,
              private fb:FormBuilder,
              // private firestore:Firestore, 
              private _medicoGeneralService:MedicoGeneralService) {
              this.atletas={ nombre:'',edad:0,disciplina:'',apellido:'',fechaNacimiento:'',sexo:'',id:0,lugarNacimiento:''}

    
  }

 ngOnInit(): void {
   this._ruta.params.subscribe((params:Params)=>{
     this.id=params['id'];
     console.log(this.id)
   })

   this.formulario=this.fb.group({
    idAtleta:[this.id],
    nombre:['',Validators.required],
    edad:['',Validators.required],
    apellido:['',Validators.required],
    fechaNacimiento:['',Validators.required],
    lugarNacimiento:['',Validators.required],
    disciplina:['',Validators.required],
    sexo:['',Validators.required],
    motivoConsulta:['',Validators.required],
    descripcionConsulta:['',Validators.required],
    manejoYTratamientoConsulta:['',Validators.required],
    dxMedico:['',Validators.required],
    fecha:[this.fecha= new Date(),Validators.required],
   })
   this.cargarDatosPersonales(this.id);
  
 }


 cargarDatosPersonales(id:number){
  
  // const identificador:number=this.id;
  // this._medicoGeneralService.ObtenerAtletas().subscribe(resp=>{
  //   for (let i = 0; i < resp.length; i++) {
  //     const element = resp[i];
  //     if(resp.find(item=>item.id==identificador)){
  //       this.atletas=resp.find(item=>item.id==identificador)
  //       return this.formulario.patchValue({
  //         nombre:this.atletas.nombre,
  //         apellido:this.atletas.apellido,
  //         edad:this.atletas.edad,
  //         fechaNacimiento:this.atletas.fechaNacimiento,
  //         lugarNacimiento:this.atletas.lugarNacimiento,
  //         disciplina:this.atletas.disciplina,
  //         sexo:this.atletas.sexo
  //       }) 
  //     }      
  //   }
  // })
}

enviar(){
  // console.log(this.formulario.value)
  // this._medicoGeneralService.AgregarConsulta(this.formulario.value)
  // this.router.navigateByUrl("/medico-general/atletas");
}

}
