import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { SecretariaService } from '../../services/secretaria.service';

@Component({
  selector: 'app-nuevo-atleta',
  templateUrl: './nuevo-atleta.component.html',
  styleUrls: ['./nuevo-atleta.component.css']
})
export class NuevoAtletaComponent implements OnInit {

  formulario!:FormGroup;
  prueba:any= {
    "name": "Saul",
    "lastName": "Soriano",
    "document": "015877178791",
    "age": 19,
    "dateOfBirth": "1999-05-01",
    "maritalStatus": "Soltero",
    "levelOfSchooling": "Medio",
    "address": "Calle",
    "cell": "8091119999",
    "phone": "8491234577",
    "bloodType": "A+",
    "weight": 20.0,
    "height": 70.0,
    "disciplineId": "1",
    "birthPlace": "Santo Domingo",
    "gender": "Femenino",
    "sportAge": "2021-7-01",
    "practiceHours": 5,
    "practiceDays": "15",
    "medicalInsurance": "00000000",
    "studyHours": 8,
    "studyDays": "4",
    "TA": "test",
    "FC": "test",
    "FR": "test"
} 

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;
  constructor(public dialog: MatDialog,
    private fb:FormBuilder,
    private router:Router,
    private secretariaService:SecretariaService,
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
    this.formulario=this.fb.group({        
      name: ['salul',Validators.required],
        lastName: ['perez',Validators.required],
        document: ['015877178791',Validators.required],
        age: [19,Validators.required],
        dateOfBirth: ['1999-05-01',Validators.required],
        maritalStatus: ['Soltero',Validators.required],
        levelOfSchooling: ['Medio',Validators.required],
        address: ['calle',Validators.required],
        cell: ['8091119999',Validators.required],
        phone: ['8491234577',Validators.required],
        bloodType: ['O+',Validators.required],
        weight: [10,Validators.required],
        height: [30,Validators.required],
        disciplineId: ['1',Validators.required],
        birthPlace: ['santo',Validators.required],
        gender: ['Masculino',Validators.required],
       // sportAge: ['',Validators.required],
        practiceHours: [0,Validators.required],
        practiceDays: ['5',Validators.required],
        medicalInsurance: ['00000002',Validators.required],
        studyHours: [1,Validators.required],
        studyDays: ['4',Validators.required],
        TA: ['test',Validators.required],
        FC: ['test',Validators.required],
        FR: ['test',Validators.required],      
    })
  }

 

  // foto(evento:any){
  //   this.formulario.controls['foto'].setValue(evento.target.files[0].name)
  // }

//redireccionar el menu
  atletas(){
    this.router.navigate(['/secretaria/atletas'])
  }
  turnos(){
    this.router.navigate(['/secretaria/turnos'])
  }

  guardar(){
  this.secretariaService.guardarAtleta(this.formulario.value).subscribe(resp=>{
    console.log(resp)
    this.atletas();   
  })

   }



}
