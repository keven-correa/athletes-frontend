import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminServiceService } from '../../../services/admin-service.service';

@Component({
  selector: 'app-nuvo-usuario',
  templateUrl: './nuvo-usuario.component.html',
  styleUrls: ['./nuvo-usuario.component.css']
})
export class NuvoUsuarioComponent {

  id!:number;
  edad!:number;
  atletas!:any;

  formulario!:FormGroup;

  mobileQuery: MediaQueryList; 

  private _mobileQueryListener: () => void;


  
ngOnDestroy(): void {
  this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  shouldRun = true;
  
    constructor(public dialog: MatDialog, private _ruta:ActivatedRoute,private fb:FormBuilder,
        private router:Router, private adminService:AdminServiceService,
       changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {
  
        this.mobileQuery = media.matchMedia('(max-width: 600px)');
        this._mobileQueryListener = () => changeDetectorRef.detectChanges();
        this.mobileQuery.addListener(this._mobileQueryListener);
  
  
     }
  
    ngOnInit(): void {
     
      this.formulario=this.fb.group({
        firstName: ['',Validators.required],
        lastName: ['',Validators.required],
        role: ['',Validators.required],
        password: ['',Validators.required],
        email: ['',Validators.required],
             
      })  
      
      
  }

  Guardar(){
    console.log(this.formulario.value)
    this.adminService.guardarUsuario(this.formulario.value).subscribe(resp=>{
      console.log(resp)
    })
    this.Usuarios();
  }
  //Redireccionar en el menu
  Usuarios(){
    this.router.navigate(['/administrador/usuarios'])
  }  
 
  
  CerrarSesion(){

    this.adminService.logOut();
    this.router.navigate(['/login'])
  }




}
