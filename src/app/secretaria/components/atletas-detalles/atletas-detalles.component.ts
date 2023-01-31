import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { SecretariaService } from '../../services/secretaria.service';

interface Atleta{
  id:number;
  nombre:string;
  apellido:string;
  disciplina:string;
  edad:number;
  sexo:string;
}
@Component({
  selector: 'app-atletas-detalles',
  templateUrl: './atletas-detalles.component.html',
  styleUrls: ['./atletas-detalles.component.css']
})
export class AtletasDetallesComponent implements OnInit {
  
    id:number=0;
    atletas:Atleta;

  mobileQuery: MediaQueryList; 

  private _mobileQueryListener: () => void;

  constructor(public dialog: MatDialog,
    private _ruta:ActivatedRoute,
    private router:Router,
    private _secretariaService:SecretariaService,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher){

      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);

      this.atletas={nombre:'',id:0,apellido:'',disciplina:'',sexo:'',edad:0}   

}

ngOnDestroy(): void {
this.mobileQuery.removeListener(this._mobileQueryListener);
}

shouldRun = true;

 ngOnInit(): void {
   this._ruta.params.subscribe((params:Params)=>{
     this.id=params['id'];
     console.log(this.id)
   })
  //  this.cargarDatos(this.id)
 }


 editar(id:number){
  this.router.navigate(['/secretaria/editar-atleta', this.id])
 }

  eliminar(id:any){
//   this._secretariaService.eliminarAtleta(id)
//   this.router.navigate(['/secretaria/atletas'])
  }

//  cargarDatos(id:number){
  
//   const identificador:number=this.id;
//   this._secretariaService.ObtenerAtletas().subscribe(resp=>{
//     for (let i = 0; i < resp.length; i++) {
//       const element = resp[i];
//       if(resp.find(item=>item.id==identificador)){
//         return this.atletas=resp.find(item=>item.id==identificador)
        

//       }
      
//     }

//   })
// }

 //Navegar en el menu
 turnos(){
  this.router.navigate(['/secretaria/turnos'])
}

atletasR(){
  this.router.navigate(['/secretaria/atletas'])
}

}

