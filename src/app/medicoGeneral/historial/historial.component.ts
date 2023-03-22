import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MedicoGeneralService } from '../services/medico-general.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MediaMatcher } from '@angular/cdk/layout';
import { FormBuilder } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css'],
})
export class HistorialComponent implements OnInit {
  id: any;
  consultas: any[] = [];

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

    this.medicoGeneralService.ConsultaById(this.id).subscribe((resp) => {
      this.consultas = resp;
      console.log(resp);
    });
  }

  detallesHistorial(id:any){
    this.router.navigate(['/medico-general/historial-detalle', id])

  }

  //Navegar en el menu
  turnos() {
    this.router.navigate(['/medico-general/turnos']);
  }

  atletasR() {
    this.router.navigate(['/medico-general/atletas']);
  }
  
}
