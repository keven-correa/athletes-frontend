import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TerapiaFisicaService } from '../../../services/terapia-fisica.service';


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
  atletas:Atleta;

  constructor(private _ruta:ActivatedRoute,
              private router:Router,
              private _terapiaFisicaService:TerapiaFisicaService) {
                this.atletas={nombre:'',id:0,apellido:'',disciplina:'',sexo:'',edad:0}      
    
  }

 ngOnInit(): void {
   this._ruta.params.subscribe((params:Params)=>{
     this.id=params['id'];
     console.log(this.id)
   });

  //  this.cargarDatos(this.id)
 }

 datosMedicos(id:number){
  this.router.navigate(['/medico-general/consulta-detalle', this.id])
 }

 referimientos(id:any){
  this.router.navigate(['terapia-fisica/referimientos',this.id])
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

 analitica(id:number){
  this.router.navigate(['/medico-general/analitica', this.id])
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
