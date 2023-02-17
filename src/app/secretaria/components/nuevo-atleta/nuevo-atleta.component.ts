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



}
