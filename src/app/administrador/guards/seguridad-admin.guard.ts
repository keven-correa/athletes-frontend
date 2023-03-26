import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AdminServiceService } from '../services/admin-service.service';

@Injectable({
  providedIn: 'root'
})
export class SeguridadAdminGuard implements CanActivate {

  constructor(private adminService:AdminServiceService, private router: Router) {}

  canActivate(): boolean {
    if (this.adminService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
  
}
