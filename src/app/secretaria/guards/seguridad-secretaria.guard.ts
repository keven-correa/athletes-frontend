import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SecretariaService } from '../services/secretaria.service';

@Injectable({
  providedIn: 'root'
})
export class SeguridadSecretariaGuard implements CanActivate {
  constructor(private secretariaService:SecretariaService, private router: Router) {}

  canActivate(): boolean {
    if (this.secretariaService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
