import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicoGeneralRoutingModule } from './medico-general-routing.module';
import { SheredModule } from '../shared/shered/shered.module';
import { HistorialDetalleComponent } from './historial-detalle/historial-detalle.component';
import { TurnosComponent } from './turnos/turnos.component';
import { ReportComponent } from './report/report.component';
import { NgChartsModule } from 'ng2-charts';
import { JsonCleanPipe } from "../shared/pipes/json-clean.pipe";
import { DashboardMedicoComponent } from './dashboard-medico/dashboard-medico.component';
import { AtendidosPorDisciplinaComponent } from './dashboardReports/atendidos-por-disciplina/atendidos-por-disciplina.component';
import { LesionesDiadgosticadasComponent } from './dashboardReports/lesiones-diadgosticadas/lesiones-diadgosticadas.component';
import { ReportLesionesDiagnosticadasComponent } from './report-lesiones-diagnosticadas/report-lesiones-diagnosticadas.component';



@NgModule({
  declarations: [
    HistorialDetalleComponent,
    TurnosComponent,
    ReportComponent,
    JsonCleanPipe,
    DashboardMedicoComponent,
    AtendidosPorDisciplinaComponent,
    LesionesDiadgosticadasComponent,
    ReportLesionesDiagnosticadasComponent
  ],
  imports: [
    CommonModule,
    MedicoGeneralRoutingModule, 
    SheredModule,
    NgChartsModule
    
  ]
})
export class MedicoGeneralModule { }
