import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MedicoGeneralService } from '../services/medico-general.service';

@Component({
  selector: 'app-consulta-atleta',
  templateUrl: './consulta-atleta.component.html',
  styleUrls: ['./consulta-atleta.component.css']
})
export class ConsultaAtletaComponent implements OnInit {

  id:number=0;
  edad!:number;
  atletas!:any;
  fechaAtleta!:any;
  formulario!:FormGroup;

  constructor(private _ruta:ActivatedRoute,
              private router:Router,
              private fb:FormBuilder,
              // private firestore:Firestore, 
              private medicoGeneralService:MedicoGeneralService) {
              this.atletas={ nombre:'',edad:0,disciplina:'',apellido:'',fechaNacimiento:'',sexo:'',id:0,lugarNacimiento:''}

    
  }

  ngOnInit(): void {
    this._ruta.params.subscribe((params:Params)=>{
      this.id=params['id'];
    })
    this.formulario=this.fb.group({
      name: ['',Validators.required],
      lastName: ['',Validators.required],
      document: ['',Validators.required],
      age: [,Validators.required],
      dateOfBirth: ['',Validators.required],
      maritalStatus: ['',Validators.required],
      levelOfSchooling: ['',Validators.required],
      address: ['',Validators.required],
      cell: ['',Validators.required],
      phone: ['',Validators.required],
      bloodType: ['',Validators.required],
      weight: [10,Validators.required],
      height: [30,Validators.required],
      discipline: ['',Validators.required],
      birthPlace: ['',Validators.required],
      gender: ['',Validators.required],
      sportAge: ['',Validators.required],
      practiceHours: [,Validators.required],
      practiceDays: ['',Validators.required],
      medicalInsurance: ['',Validators.required],
      studyHours: [,Validators.required],
      studyDays: ['',Validators.required],
      TA: ['',Validators.required],
      FC: ['',Validators.required],
      FR: ['',Validators.required],      
      isActive: [true,Validators.required],      
    })

    
    
    this.datosAtleta();

    this.edadAtleta();  
   }
   
   // Fecha de nacimiento a edad
   edadAtleta(){
     const calculateAge = (birthday:any) => {
       const ageDifMs = Date.now() - new Date(birthday).getTime();
       const ageDate = new Date(ageDifMs);
       return Math.abs(ageDate.getUTCFullYear() - 1970);
   }
   var dia = this.atletas.dateOfBirth.toString().substring(0,10);
   this.edad=(calculateAge(dia))
   console.log(this.edad);
   
   this.fechaAtleta = this.atletas.dateOfBirth.toString().substring(0,10);
   }

   datosAtleta(){
    this.medicoGeneralService.detalleAtleta(this.id).subscribe(resp=>{
      this.atletas = resp;
      console.log(resp)
  
      this.formulario.patchValue({
        name:resp.name,
        lastName: resp.lastName,
        document: resp.document,
        age: this.edad,
        dateOfBirth: resp.dateOfBirth.toString().substring(0,10),
        maritalStatus: resp.maritalStatus,
        levelOfSchooling: resp.levelOsSchooling,
        address: resp.address,
        cell: resp.cell,
        phone: resp.phone,
        bloodType: resp.bloodType,
        weight: resp.weight,
        height: resp.height,
        discipline: resp.discipline,
        birthPlace: resp.birthPlace,
        gender: resp.gender,
        sportAge: resp.sportAge,
        practiceHours: resp.practiceHours,
        practiceDays: resp.practiceDays,
        medicalInsurance: resp.medicalInsurance,
        studyHours: resp.studyHours,
        studyDays: resp.studyDays,
        TA: resp.TA,
        FC: resp.FC,
        FR: resp.FR,
        isActive: resp.isActive
      })
      // console.log(this.formulario.value)
    }) 
   }

enviar(){
  // console.log(this.formulario.value)
  // this._medicoGeneralService.AgregarConsulta(this.formulario.value)
  // this.router.navigateByUrl("/medico-general/atletas");
}

}
