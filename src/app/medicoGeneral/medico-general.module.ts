import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicoGeneralRoutingModule } from './medico-general-routing.module';
import { SheredModule } from '../shared/shered/shered.module';
import { HistorialDetalleComponent } from './historial-detalle/historial-detalle.component';
import { TurnosComponent } from './turnos/turnos.component';
import { ReportComponent } from './report/report.component';
import { NgChartsModule } from 'ng2-charts';



@NgModule({
  declarations: [
    HistorialDetalleComponent,
    TurnosComponent,
    ReportComponent,
  ],
  imports: [
    CommonModule,
    MedicoGeneralRoutingModule, 
    SheredModule,
    NgChartsModule
    
  ]
})
export class MedicoGeneralModule { }
