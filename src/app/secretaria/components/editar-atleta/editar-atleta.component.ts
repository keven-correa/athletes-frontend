import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SecretariaService } from '../../services/secretaria.service';
import { AtletaI } from '../../../shared/Models/atleta.interface';



@Component({
  selector: 'app-editar-atleta',
  templateUrl: './editar-atleta.component.html',
  styleUrls: ['./editar-atleta.component.css']
})
export class EditarAtletaComponent implements OnInit {
  id!:number;
  edad!:number;
  atletas!:any;

  formulario!:FormGroup;

  mobileQuery: MediaQueryList; 

  private _mobileQueryListener: () => void;

ngOnDestroy(): void {
this.mobileQuery.removeListener(this._mobileQueryListener);
}
shouldRun = true;

  constructor(public dialog: MatDialog, private _ruta:ActivatedRoute,private fb:FormBuilder,
     private _secretariaservice:SecretariaService, private router:Router,
     changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {

      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);


   }

  ngOnInit(): void {
    this._ruta.params.subscribe(resp=>{
      this.id=resp['id'];
      
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
      // disciplineId: ['',Validators.required],
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

edadAtleta(){
  const calculateAge = (birthday:any) => {
    const ageDifMs = Date.now() - new Date(birthday).getTime();
    const ageDate = new Date(ageDifMs);
    return Math.abs(ageDate.getUTCFullYear() - 1970);
}
var dia = this.atletas.dateOfBirth.toString().substring(0,10);
this.edad=(calculateAge(dia))
}

 Actualizar(){
this._secretariaservice.actualizarAtleta(this.id,this.formulario.value).subscribe(resp=>{
console.log(resp)
this.router.navigate(['/secretaria/atletas'])

})
 }

 datosAtleta(){
  this._secretariaservice.detalleAtleta(this.id).subscribe(resp=>{
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
      // disciplineId: resp.discipline.name,
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

 //Navegar en el menu
 turnos(){
  this.router.navigate(['/secretaria/turnos'])
}

atletasR(){
  this.router.navigate(['/secretaria/atletas'])
}


}
