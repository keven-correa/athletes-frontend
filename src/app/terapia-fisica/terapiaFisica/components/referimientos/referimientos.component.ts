import { Component, OnInit } from '@angular/core';
import { Params, Router, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs';
import { ReferimientoService } from 'src/app/terapia-fisica/services/referimiento.service';
import { TerapiaFisicaService } from '../../../services/terapia-fisica.service';



@Component({
  selector: 'app-referimientos',
  templateUrl: './referimientos.component.html',
  styleUrls: ['./referimientos.component.css']
})
export class ReferimientosComponent implements OnInit {

  id:number=0;
  Consultas: any[] = []
  referimientos: any[] = []
  

  constructor(private _router: Router,
    private _terapiaFisicaService: TerapiaFisicaService, private _ruta:ActivatedRoute) {
    
    // this.detalleAtletasReferidos={id:0,nombre:'',apellido:'',disciplina:'',edad:0,sexo:'',fechaNacimiento:'',lugarNacimiento:''}
  }

  ngOnInit(): void {
    this._ruta.params.subscribe((params:Params)=>{
      this.id=params['id'];
      // console.log(this.id)
    });

    // this.cargarReferimientosDatos();

    // console.log(this.Consultas);
    // this.cargarDatos();
    // console.log(this.referimientos);
  }

  evaluar(id: number) {
    this._router.navigate(['/terapia-fisica/evaluacion', id])

  }



  // cargarDatos(){
  //   const identificador:number=this.id;
  //   this._terapiaFisicaService.ObtenerConsultas().subscribe(resp=>{
  //     let t = resp.filter(a=>a.idAtleta==this.id)
  //     console.log(t)
      
      
  //   })
  // }


}
  






