import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminServiceService } from '../../services/admin-service.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent {

  mobileQuery: MediaQueryList; 

  private _mobileQueryListener: () => void;

  constructor(private adminService:AdminServiceService,
    public dialog: MatDialog,
              private router:Router,
              changeDetectorRef: ChangeDetectorRef, media: MediaMatcher    
    ) { 

      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnDestroy(): void {
      this.mobileQuery.removeListener(this._mobileQueryListener);
    }
  
 //Navegar en el menu
 disciplina(){
  this.router.navigate(['/administrador/disciplinas'])
}

usuariosR(){
  this.router.navigate(['/administrador/usuarios'])
}

atletasR(){
this.router.navigate(['/administrador/atletas'])
}


    CerrarSesion(){

      this.adminService.logOut();
      this.router.navigate(['/login'])
    }

}
