import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MedicoGeneralService } from '../services/medico-general.service';

interface Atleta{
  id:number;
  nombre:string;
  apellido:string;
  disciplina:string;
  edad:number;
  sexo:string;
}

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





turnos(){
  this.router.navigate(['/medico-general/turnos'])
}

atletasR(){
  this.router.navigate(['/medico-general/atletas'])
}

 datosMedicos(id:number){
  this.router.navigate(['/medico-general/datos-medicos', this.id])
 }

 consulta(){
  this.router.navigate(['/medico-general/consulta-atleta', this.id])
 }

 historial(){
  this.router.navigate(['/medico-general/historial', this.id])
 }

//  cargarDatos(id:number){
  
//   const identificador:number=this.id;
//   this.medicoGeneralService.ObtenerAtletas().subscribe(resp=>{
//     for (let i = 0; i < resp.length; i++) {
//       const element = resp[i];
//       if(resp.find(item=>item.id==identificador)){
//         return this.atletas=resp.find(item=>item.id==identificador)
        

//       }
      
//     }

//   })
// }

}
