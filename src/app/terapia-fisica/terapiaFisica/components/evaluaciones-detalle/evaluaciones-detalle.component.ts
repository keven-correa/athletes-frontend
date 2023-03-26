import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TerapiaFisicaService } from '../../../services/terapia-fisica.service';

@Component({
  selector: 'app-evaluaciones-detalle',
  templateUrl: './evaluaciones-detalle.component.html',
  styleUrls: ['./evaluaciones-detalle.component.css']
})
export class EvaluacionesDetalleComponent {
  id:any;

  detallesEvaluacion:any


  constructor(private _ruta:ActivatedRoute, private terapiaFisicaService:TerapiaFisicaService,
              private router:Router){

  }

  ngOnInit(): void {
    this._ruta.params.subscribe((params:Params)=>{
      this.id=params['id'];
    })

    this.terapiaFisicaService.EvaluacionDetalle(this.id).subscribe(resp=>{
      this.detallesEvaluacion=resp     
    }) 

   }

   mostrar(){
    // console.log(this.evaluaciones)       
   }
   mostrarPorAtleta(){
    // console.log(this.evaluacionesDeAtleta)       

   }

   mostrarDetalles(){
    console.log(this.detallesEvaluacion)   
   }

   nuevaTerapia(){
    this.router.navigate(['terapia-fisica/nueva-terapia',this.id])
   }

}
