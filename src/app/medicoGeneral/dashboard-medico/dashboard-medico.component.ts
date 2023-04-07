import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MedicoGeneralService } from '../services/medico-general.service';

@Component({
  selector: 'app-dashboard-medico',
  templateUrl: './dashboard-medico.component.html',
  styleUrls: ['./dashboard-medico.component.css']
})
export class DashboardMedicoComponent {

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(private medicogeneralservice: MedicoGeneralService,
    public dialog: MatDialog,
    private router: Router,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher
  ) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }


  CerrarSesion() {

    this.medicogeneralservice.logOut();

  }


  //Navegar en el menu
  turnos() {
    this.router.navigate(['/medico-general/turnos'])
  }

  atletasR() {
    this.router.navigate(['/medico-general/atletas'])
  }
  inicioR() {
    this.router.navigate(['/medico-general/dashboard'])

  }

}
