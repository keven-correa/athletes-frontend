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
  atleta!:AtletaI;

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
      id:[''],
      name:['',Validators.required],
      lastName:['',Validators.required],
      age:['',Validators.required],
      dateOfBirth:['',Validators.required],
      placeOfBirth:['',Validators.required],
      discipline:[Validators.required],
      gender:['',Validators.required],
      maritalStatus:['',Validators.required],
      //modalidad:['',Validators.required],
      sportAge:['',Validators.required],
      hoursOfPractice:['',Validators.required],
      practiceDays:['',Validators.required],
      healthInsurance:[''],
      levelOfSchooling:['',Validators.required],
      //horasEstudio:['',Validators.required],
      //diasEstudio:['',Validators.required],
      address:['',Validators.required],
      cell:['',Validators.required],
      phone:['',Validators.required],
      bloodType:['',Validators.required],
      weight:['',Validators.required],
      height:['',Validators.required],
      isActive:[true,Validators.required],
      //TA:['',Validators.required],
      //FC:['',Validators.required],
      //FR:['',Validators.required],
      //tempe:['',Validators.required],
      document:[''],
      created_by:['']
    })

   this.cargarDatos(this.id);
}

cargarDatos(id:number){
  
  
  this._secretariaservice.getAtletas().subscribe(resp=>{  
      
      
        return this.formulario.patchValue({
          name: this.atleta.name,
      lastName:this.atleta.lastName,
      age:this.atleta.age,
      discipline:this.atleta.discipline,
      //sexo:this.atleta.sexo,
      maritalStatus:this.atleta.maritalStatus,
      dateOfBirth:this.atleta.dateOfBirth,
      //lugarNacimiento:this.atleta.lugarNacimiento,
      //edadDeportiva:this.atleta.edadDeportiva,
      //horasPractica:this.atleta.horasPractica,
      //diasPractica:this.atleta.diasPractica,
      //seguroMedico:this.atleta.seguroMedico,
      levelOfSchooling:this.atleta.levelOfSchooling,
      //horasEstudio:this.atleta.horasEstudio,
      //diasEstudio:this.atleta.diasEstudio,
      address:this.atleta.address,
      cell:this.atleta.cell,
      phone:this.atleta.phone,
      bloodType:this.atleta.bloodType,
      weight:this.atleta.weight,
      height:this.atleta.height,
      //TA:this.atleta.TA,
      //FC:this.atleta.FC,
      //FR:this.atleta.FR,
      //tempe:this.atleta.tempe,
      document:this.atleta.document
        }) 
      }      
    
  )
}

 Actualizar(){
//   this._secretariaservice.ActualizarAtleta(this.id,this.formulario.value)
//   this.router.navigate(['/secretaria/atletas'])
 }

 //Navegar en el menu
 turnos(){
  this.router.navigate(['/secretaria/turnos'])
}

atletasR(){
  this.router.navigate(['/secretaria/atletas'])
}


}
