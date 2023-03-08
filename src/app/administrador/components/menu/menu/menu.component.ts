import { Component } from '@angular/core';
import { AdminServiceService } from 'src/app/administrador/services/admin-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {

  constructor(private adminservice:AdminServiceService, private router:Router){

  }






  CerrarSesion(){

    this.adminservice.logOut();
    this.router.navigate(['/login'])
  }

}
