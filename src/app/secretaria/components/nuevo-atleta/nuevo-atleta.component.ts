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

  public fechaNacimiento!:Date;
  public edad!:number;

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
      id:[''],
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
      cedula:['']
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

   async guardar(){
  //   await this.secretariaService.AgregarAtletas(this.formulario.value);
  //   this.router.navigateByUrl("/secretaria/atletas");
   }

  fecha(){
    if (this.fechaNacimiento) {
      var tiempo=Math.abs(Date.now() - Number(this.fechaNacimiento ));
      this.edad = Math.floor((tiempo/(1000*3600*24))/365); 
    }
    console.log(this.edad);
  }

}
