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

id:number=0
formulario!:FormGroup;
consulta:any;
idAtleta:any;

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
this._terapiaFisicaService.ConsultaDetalle(this.id).subscribe(resp=>{
  this.consulta=resp;
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
  // this._terapiaFisicaService.AgregarTerapia(this.formulario.value);
  this.router.navigateByUrl("/terapia-fisica/atletas")
}

}
  
