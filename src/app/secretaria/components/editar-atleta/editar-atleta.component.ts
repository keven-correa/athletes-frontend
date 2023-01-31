import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { SecretariaService } from '../../services/secretaria.service';

interface atleta{
  nombre: string,
  apellido:string,
  edad:string;
  disciplina:string,
  sexo:string;
  estadoCivil:string,
  fechaNacimiento:string,
  lugarNacimiento:string,
  modalidad:string,
  edadDeportiva:string,
  horasPractica:string,
  diasPractica:string,
  seguroMedico:string,
  escolaridad:string,
  horasEstudio:string,
  diasEstudio:string,
  direccion:string,
  telefonoCelular:string,
  telefonoCasa:string,
  tipoSangre:string,
  peso:string,
  altura:string,
  TA:string,
  FC:string,
  FR:string,
  tempe:string,
  cedula:string
}

@Component({
  selector: 'app-editar-atleta',
  templateUrl: './editar-atleta.component.html',
  styleUrls: ['./editar-atleta.component.css']
})
export class EditarAtletaComponent implements OnInit {
  id!:number;
  atleta:atleta;

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

    this.atleta={ nombre: '',
      apellido:'',
      edad:'',
      disciplina:'',
      sexo:'',
      estadoCivil:'',
      fechaNacimiento:'',
      lugarNacimiento:'',
      modalidad:'',
      edadDeportiva:'',
      horasPractica:'',
      diasPractica:'',
      seguroMedico:'',
      escolaridad:'',
      horasEstudio:'',
      diasEstudio:'',
      direccion:'',
      telefonoCelular:'',
      telefonoCasa:'',
      tipoSangre:'',
      peso:'',
      altura:'',
      TA:'',
      FC:'',
      FR:'',
      tempe:'',
      cedula:'0'}

   }

  ngOnInit(): void {
    this._ruta.params.subscribe(resp=>{
      this.id=resp['id'];
      
    })
    this.formulario=this.fb.group({
      nombre:['',Validators.required],
      apellido:['',Validators.required],
      edad:['',Validators.required],
      fechaNacimiento:['',Validators.required],
      lugarNacimiento:['',Validators.required],
      disciplina:['',Validators.required],
      sexo:['',Validators.required],
      estadoCivil:['',Validators.required],
      modalidad:['',Validators.required],
      edadDeportiva:['',Validators.required],
      horasPractica:['',Validators.required],
      diasPractica:['',Validators.required],
      seguroMedico:[''],
      escolaridad:['',Validators.required],
      horasEstudio:['',Validators.required],
      diasEstudio:['',Validators.required],
      direccion:['',Validators.required],
      telefonoCelular:['',Validators.required],
      telefonoCasa:['',Validators.required],
      tipoSangre:['',Validators.required],
      peso:['',Validators.required],
      altura:['',Validators.required],
      TA:['',Validators.required],
      FC:['',Validators.required],
      FR:['',Validators.required],
      tempe:['',Validators.required],
      cedula:['0']
      
  }) 
  // this.cargarDatos(this.id);
}

// cargarDatos(id:number){
  
//   const identificador:number=this.id;
//   this._secretariaservice.ObtenerAtletas().subscribe(resp=>{
//     for (let i = 0; i < resp.length; i++) {
//       const element = resp[i];
//       if(resp.find(item=>item.id==identificador)){
//         this.atleta=resp.find(item=>item.id==identificador)
//         return this.formulario.patchValue({
//           nombre: this.atleta.nombre,
//       apellido:this.atleta.apellido,
//       edad:this.atleta.edad,
//       disciplina:this.atleta.disciplina,
//       sexo:this.atleta.sexo,
//       estadoCivil:this.atleta.estadoCivil,
//       fechaNacimiento:this.atleta.fechaNacimiento,
//       lugarNacimiento:this.atleta.lugarNacimiento,
//       modalidad:this.atleta.modalidad,
//       edadDeportiva:this.atleta.edadDeportiva,
//       horasPractica:this.atleta.horasPractica,
//       diasPractica:this.atleta.diasPractica,
//       seguroMedico:this.atleta.seguroMedico,
//       escolaridad:this.atleta.escolaridad,
//       horasEstudio:this.atleta.horasEstudio,
//       diasEstudio:this.atleta.diasEstudio,
//       direccion:this.atleta.direccion,
//       telefonoCelular:this.atleta.telefonoCelular,
//       telefonoCasa:this.atleta.telefonoCasa,
//       tipoSangre:this.atleta.tipoSangre,
//       peso:this.atleta.peso,
//       altura:this.atleta.altura,
//       TA:this.atleta.TA,
//       FC:this.atleta.FC,
//       FR:this.atleta.FR,
//       tempe:this.atleta.tempe,
//       cedula:this.atleta.cedula
//         }) 
//       }      
//     }
//   })
// }

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
