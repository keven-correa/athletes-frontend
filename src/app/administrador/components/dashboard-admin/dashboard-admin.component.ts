import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AdminServiceService } from '../../services/admin-service.service';

@Component({
  selector: 'app-dashboard-admin',
  templateUrl: './dashboard-admin.component.html',
  styleUrls: ['./dashboard-admin.component.css']
})
export class DashboardAdminComponent implements OnInit {
  totalAtletas: any;
  totalMedicos: any;
  totalTerapeuta: any;

  mobileQuery: MediaQueryList;

  private _mobileQueryListener: () => void;

  constructor(private adminService: AdminServiceService,
    public dialog: MatDialog,
    private router: Router,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher
  ) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }
  ngOnInit(): void {
    this.adminService.getAtletas().subscribe(resp => {
      this.totalAtletas = resp.length
    })

    this.adminService.Usuarios().subscribe(resp => {
      console.log(resp)
      const totalMedicosGenerales = resp.reduce((total: any, usuario: any) => {
        if (usuario.role === 'MedicoGeneral') {
          return total + 1;
        } else {
          return total;
        }
      }, 0);
      this.totalMedicos = totalMedicosGenerales

      const totalTerapeutas = resp.reduce((total: any, usuario: any) => {
        if (usuario.role === 'Fisioterapeuta') {
          return total + 1;
        } else {
          return total;
        }
      }, 0);
      this.totalTerapeuta = totalTerapeutas
    });


  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }





  //Navegar en el menu
  disciplina() {
    this.router.navigate(['/administrador/disciplinas'])
  }

  usuariosR() {
    this.router.navigate(['/administrador/usuarios'])
  }

  atletasR() {
    this.router.navigate(['/administrador/atletas'])
  }

  diagnosticosR() {
    this.router.navigate(['/administrador/diagnosticos'])
  }
  inicioR() {
    this.router.navigate(['/administrador/dashboard'])

  }

  CerrarSesion() {

    this.adminService.logOut();
    this.router.navigate(['/login'])
  }

}
