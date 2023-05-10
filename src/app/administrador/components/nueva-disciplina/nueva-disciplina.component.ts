import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminServiceService } from '../../services/admin-service.service';

@Component({
  selector: 'app-nueva-disciplina',
  templateUrl: './nueva-disciplina.component.html',
  styleUrls: ['./nueva-disciplina.component.css']
})
export class NuevaDisciplinaComponent {

  id!:number;
  edad!:number;
  

  formulario!:FormGroup;

  mobileQuery: MediaQueryList; 

  private _mobileQueryListener: () => void;


  
ngOnDestroy(): void {
  this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  
    constructor(public dialog: MatDialog, private _ruta:ActivatedRoute,private fb:FormBuilder,
        private router:Router, private adminService:AdminServiceService,
       changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
  
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
  
  
     }
  
    ngOnInit(): void {
     
      this.formulario=this.fb.group({
        name: ['',Validators.required],
        description: ['Nada',Validators.required],             
      })  
      
      
  }

  Guardar(){
    console.log(this.formulario.value)
    this.adminService.guardarDisciplina(this.formulario.value).subscribe(resp=>{
      this.disciplina();
    })
  }
  //Navegar en el menu
  disciplina() {
    window.location.replace('/administrador/disciplinas');   

  }
  
  usuariosR() {
    this.router.navigate(['/administrador/usuarios'])
  }
  
  atletasR() {
    this.router.navigate(['/administrador/atletas'])
  }
  
  diagnosticosR() {
    this.router.navigate(['/administrador/diagnosticos'])
  }
  inicioR() {
    this.router.navigate(['/administrador/dashboard'])
  
  }

 
  
  CerrarSesion(){

    this.adminService.logOut();
    this.router.navigate(['/login'])
  }


}
