import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TerapiaFisicaService } from 'src/app/terapia-fisica/services/terapia-fisica.service';


@Component({
  selector: 'app-evaluacion',
  templateUrl: './evaluacion.component.html',
  styleUrls: ['./evaluacion.component.css']
})
export class EvaluacionComponent implements OnInit {

id:number=0;
idTerapeuta:any= localStorage.getItem('idTerapeuta');
formulario!:FormGroup;
consulta!:any;

mobileQuery: MediaQueryList; 

private _mobileQueryListener: () => void;

@ViewChild(MatPaginator) paginator!: MatPaginator;

constructor(private fb:FormBuilder,
  public dialog: MatDialog,
            private _ruta:ActivatedRoute,
            private _terapiaFisicaService:TerapiaFisicaService,
            private router:Router,
            changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {

              this.mobileQuery = media.matchMedia('(max-width: 600px)');
              this._mobileQueryListener = () => changeDetectorRef.detectChanges();
              this.mobileQuery.addListener(this._mobileQueryListener);
 }

  ngOnInit(){
  this._ruta.params.subscribe((params:Params)=>{
    this.id=params['id'];
    
  });
  
this._terapiaFisicaService.ConsultaDetalle(this.id).subscribe(resp=>{
  this.consulta=resp; 
})

  this.formulario=this.fb.group({    
    therapeuticDiagnosis:['',Validators.required],
    treatment:['',Validators.required],
    ROM:[0,Validators.required],
    remarks:['',Validators.required],
    painLevel:['',Validators.required],
    numberOfTherapies:['',Validators.required],
    athlete:[Number(localStorage.getItem("idAtleta")),Validators.required],    
  }) 

}

ngOnDestroy(): void {
  this.mobileQuery.removeListener(this._mobileQueryListener);
}


//Navegar en el menu
turnos(){
  this.router.navigate(['/terapia-fisica/turnos'])
}

atletasR(){
  this.router.navigate(['/terapia-fisica/atletas'])
}

referimientos(){
  this.router.navigate(['/terapia-fisica/referimientos'])
}

guardar(){
  console.log(this.formulario.value)
  this._terapiaFisicaService.NuevaEvaluacion(this.formulario.value).subscribe(resp=>{
    console.log(resp)
    this.router.navigateByUrl("/terapia-fisica/atletas")
  },err=>{
    console.log(err)
  })

}

}
  
