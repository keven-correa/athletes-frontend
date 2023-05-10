import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminServiceService } from '../../services/admin-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nuevo-diagnostico',
  templateUrl: './nuevo-diagnostico.component.html',
  styleUrls: ['./nuevo-diagnostico.component.css']
})
export class NuevoDiagnosticoComponent implements OnInit {
  formulario!:FormGroup;

  constructor(private fb:FormBuilder, private adminService:AdminServiceService, private router:Router){

  }

  ngOnInit(): void {

    this.formulario=this.fb.group({
      name: ['',Validators.required]            
    })  
  }





  guardar(){
    console.log(this.formulario.value)

    this.adminService.addDiagnostico(this.formulario.value).subscribe(resp=>{
      console.log(resp)
      window.location.replace('/administrador/diagnosticos');   

    })
  }
}
