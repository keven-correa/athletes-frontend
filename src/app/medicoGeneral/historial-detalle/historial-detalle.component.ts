import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { MedicoGeneralService } from '../services/medico-general.service';

@Component({
  selector: 'app-historial-detalle',
  templateUrl: './historial-detalle.component.html',
  styleUrls: ['./historial-detalle.component.css']
})
export class HistorialDetalleComponent {

  id: any;
  Detalleconsulta: any;

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  constructor(
    private _ruta: ActivatedRoute,
    public dialog: MatDialog,
    private fb: FormBuilder,
    private router: Router,
    private medicoGeneralService: MedicoGeneralService,
    changeDetectorRef: ChangeDetectorRef,
    media: MediaMatcher
  ) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnInit(): void {
    this._ruta.params.subscribe((params: Params) => {
      this.id = params['id'];
    });

    this.medicoGeneralService.ConsultaDetalle(this.id).subscribe((resp) => {
      this.Detalleconsulta = resp;
      console.log(resp);
    });
  }

  //Navegar en el menu
  turnos() {
    this.router.navigate(['/medico-general/turnos']);
  }

  atletasR() {
    this.router.navigate(['/medico-general/atletas']);
  }  

  CerrarSesion(){

    this.medicoGeneralService.logOut();
    this.router.navigate(['/login'])
  }

}
