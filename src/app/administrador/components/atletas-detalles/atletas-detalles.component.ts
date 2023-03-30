import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { AtletaI } from '../../../shared/Models/atleta.interface';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
// import { NuevoTurnoComponent } from '../nuevo-turno/nuevo-turno.component';
import Swal from 'sweetalert2';
import { AdminServiceService } from '../../services/admin-service.service';

@Component({
  selector: 'app-atletas-detalles',
  templateUrl: './atletas-detalles.component.html',
  styleUrls: ['./atletas-detalles.component.css']
})
export class AtletasDetallesComponent implements OnInit {
  
    id:number=0;
    edad!:number;
    atletas!:any;
    fechaAtleta!:any;

  mobileQuery: MediaQueryList; 

  private _mobileQueryListener: () => void;

  constructor(public dialog: MatDialog,
    private _ruta:ActivatedRoute,
    private router:Router,
    private bottomSheet:MatBottomSheet,
    private adminService:AdminServiceService,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher){

      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
    
}

ngOnDestroy(): void {
this.mobileQuery.removeListener(this._mobileQueryListener);
}


 ngOnInit(): void {
   this._ruta.params.subscribe((params:Params)=>{
     this.id=params['id'];
   })
    this.adminService.detalleAtleta(this.id).subscribe(resp=>{
      this.atletas = resp;
      // console.log(resp)
      this.edadAtleta();  
      
    }) 
 }


 editar(id:number){
  this.router.navigate(['/administrador/editar-atleta', this.id])
 }

  eliminar(id:any){
//   this._secretariaService.eliminarAtleta(id)
//   this.router.navigate(['/secretaria/atletas'])
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
 disciplina(){
  this.router.navigate(['/administrador/disciplinas'])
}

usuariosR(){
  this.router.navigate(['/administrador/usuarios'])
}

atletasR(){
this.router.navigate(['/administrador/atletas'])
}

// crearTurno(){
//   this.router.navigate(['/secretaria/nuevo-turno',this.id]);
// }


//modal
// crearTurno(){
//   this.bottomSheet.open(NuevoTurnoComponent,{
//     data:this.id
//   });}

}

