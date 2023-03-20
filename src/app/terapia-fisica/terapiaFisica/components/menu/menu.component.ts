import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TerapiaFisicaService } from 'src/app/terapia-fisica/services/terapia-fisica.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router:Router, private terapiaFisicaService:TerapiaFisicaService) { }

  ngOnInit(): void {
  }
  atletas(){
    this.router.navigateByUrl('terapia-fisica/atletas')
  }
  historial(){
    // this.router.navigateByUrl('/medico-general/historial')
  }

  consultas(){
    // this.router.navigateByUrl('/medico-general/consultas')
  }

  CerrarSesion(){

    this.terapiaFisicaService.logOut();
    this.router.navigate(['/login'])
  }

}
