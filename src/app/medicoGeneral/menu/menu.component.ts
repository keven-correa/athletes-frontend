import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MedicoGeneralService } from '../services/medico-general.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router:Router, private medicoGeneralService:MedicoGeneralService) { }

  ngOnInit(): void {
  }

  atletas(){
    this.router.navigateByUrl('medico-general/atletas')
  }
  historial(){
    this.router.navigateByUrl('/medico-general/historial')
  }

  consultas(){
    this.router.navigateByUrl('/medico-general/consultas')
  }

  CerrarSesion(){

    this.medicoGeneralService.logOut();
    this.router.navigate(['/login'])
  }

}
