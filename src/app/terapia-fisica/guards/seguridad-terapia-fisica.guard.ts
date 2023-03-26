import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TerapiaFisicaService } from '../services/terapia-fisica.service';

@Injectable({
  providedIn: 'root'
})
export class SeguridadTerapiaFisicaGuard implements CanActivate {

  constructor(private terapiaFisicaService:TerapiaFisicaService, private router: Router) {}

  canActivate(): boolean {
    if (this.terapiaFisicaService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
