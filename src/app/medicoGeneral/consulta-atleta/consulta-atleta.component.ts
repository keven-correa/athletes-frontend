import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MedicoGeneralService } from '../services/medico-general.service';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-consulta-atleta',
  templateUrl: './consulta-atleta.component.html',
  styleUrls: ['./consulta-atleta.component.css']
})
export class ConsultaAtletaComponent implements OnInit {

  id:number=0;
  atletas!:any;
  formulario!:FormGroup;

  
  mobileQuery: MediaQueryList; 
  private _mobileQueryListener: () => void;

  constructor(private _ruta:ActivatedRoute,
    public dialog: MatDialog,
    private fb:FormBuilder,
    private router:Router,
    private medicoGeneralService:MedicoGeneralService,
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
    this._ruta.params.subscribe((params:Params)=>{
      this.id=params['id'];
    })

    this.medicoGeneralService.detalleAtleta(this.id).subscribe(resp=>{
      this.atletas=resp
    })

    //Convertir el id a int
    let identificador = Number(this.id)


    this.formulario=this.fb.group({       
      reason: ['',Validators.required],      
      diagnostic: ['',Validators.required],      
      notes: ['',Validators.required],      
      priority: ['Media',Validators.required],      
      athlete: [identificador,Validators.required],      
      // assigned_to: [2,Validators.required],      
    })
     
   }  

enviar(){
  console.log(this.formulario.value)
  this.medicoGeneralService.NuevaConsulta(this.formulario.value).subscribe(resp=>{
    console.log(resp);
    this.atletasR();
  }, error=>{
      console.log(error)
  }
  )
}


    //Navegar en el menu
    turnos(){
      this.router.navigate(['/medico-general/turnos'])
    }

    atletasR(){
      this.router.navigate(['/medico-general/atletas'])
    }
    

}
