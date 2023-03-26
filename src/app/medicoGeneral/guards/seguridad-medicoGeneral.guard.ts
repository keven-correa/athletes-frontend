import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { MedicoGeneralService } from '../services/medico-general.service';

@Injectable({
  providedIn: 'root'
})
export class SeguridadGuard implements CanActivate {
  constructor(private medicoGeneralService:MedicoGeneralService, private router: Router) {}

  canActivate(): boolean {
    if (this.medicoGeneralService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
