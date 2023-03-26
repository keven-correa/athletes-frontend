import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TerapiaFisicaService } from '../../../services/terapia-fisica.service';


@Component({
  selector: 'app-atleta-detalle',
  templateUrl: './atleta-detalle.component.html',
  styleUrls: ['./atleta-detalle.component.css']
})
export class AtletaDetalleComponent implements OnInit {

  id:number=0;
  edad!:number;
  atletas!:any;
  fechaAtleta!:any;

mobileQuery: MediaQueryList; 

private _mobileQueryListener: () => void;

constructor(public dialog: MatDialog,
  private _ruta:ActivatedRoute,
  private router:Router,
  private terapiaFisicaService:TerapiaFisicaService,
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
  this.terapiaFisicaService.detalleAtleta(this.id).subscribe(resp=>{
    this.atletas = resp;
    // console.log(resp)
    this.edadAtleta();  
    
  }) 
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

this.fechaAtleta = this.atletas.dateOfBirth.toString().substring(0,10);
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


terapia(id:any){
  this.router.navigate(['terapia-fisica/terapia',this.id])
}

 consulta(id:number){
  this.router.navigate(['/medico-general/consulta-atleta', this.id])
 }

 historial(id:number){
  this.router.navigate(['/terapia-fisica/historial', this.id])
 }

 evaluaciones(){
  this.router.navigate(['/terapia-fisica/evaluaciones-atleta', this.id])
 }

//  cargarDatos(id:number){

//   const identificador:number=this.id;
//   this._terapiaFisicaService.ObtenerAtletas().subscribe(resp=>{
//     for (let i = 0; i < resp.length; i++) {
//       const element = resp[i];
//       if(resp.find(item=>item.id==identificador)){
//         return this.atletas=resp.find(item=>item.id==identificador)
        

//       }
      
//     }

//   })
// }


}
