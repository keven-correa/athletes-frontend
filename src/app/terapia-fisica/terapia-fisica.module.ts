import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { TerapiaFisicaRoutingModule } from './terapia-fisica-routing.module';
import { AtletasComponent } from './terapiaFisica/components/atletas/atletas.component';
import { MenuComponent } from "./terapiaFisica/components/menu/menu.component";
import { SheredModule } from '../shared/shered/shered.module';
import { AtletaDetalleComponent } from './terapiaFisica/components/atleta-detalle/atleta-detalle.component';
import { ReferimientosComponent } from './terapiaFisica/components/referimientos/referimientos.component';
import { HistorialComponent } from './terapiaFisica/components/historial/historial.component';
import { TerapiaComponent } from './terapiaFisica/components/terapia/terapia.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EvaluacionComponent } from './terapiaFisica/components/evaluacion/evaluacion.component';
import { TerapiaDetalleComponent } from './terapiaFisica/components/terapia-detalle/terapia-detalle.component';
import { EvaluacionesDetalleComponent } from './terapiaFisica/components/evaluaciones-detalle/evaluaciones-detalle.component';
import { NuevaTerapiaComponent } from './terapiaFisica/components/nueva-terapia/nueva-terapia.component';
import { EvaluacionesPorAtletaComponent } from './terapiaFisica/components/evaluaciones-por-atleta/evaluaciones-por-atleta.component';
import { TurnosComponent } from './terapiaFisica/components/turnos/turnos.component';
import { ReportsComponent } from './terapiaFisica/reports/reports.component';
import { NgChartsModule } from 'ng2-charts';
import { DashboardTerapeutaComponent } from './terapiaFisica/components/dashboard-terapeuta/dashboard-terapeuta.component';
import { TerapiasPorDisciplinaComponent } from './terapiaFisica/components/dashboardReports/terapias-por-disciplina/terapias-por-disciplina.component';
import { DiagnosticosEvaluadosComponent } from './terapiaFisica/components/dashboardReports/diagnosticos-evaluados/diagnosticos-evaluados.component';


@NgModule({
  declarations: [
    AtletasComponent,
    MenuComponent,
    AtletaDetalleComponent,
    ReferimientosComponent,
    HistorialComponent,
    TerapiaComponent,
    EvaluacionComponent,
    TerapiaDetalleComponent,
    EvaluacionesDetalleComponent,
    NuevaTerapiaComponent,
    EvaluacionesPorAtletaComponent,
    TurnosComponent,
    ReportsComponent,
    DashboardTerapeutaComponent,
    TerapiasPorDisciplinaComponent,
    DiagnosticosEvaluadosComponent,
  ],
  imports: [
    CommonModule,
    TerapiaFisicaRoutingModule,
    SheredModule,
    ReactiveFormsModule,
    NgChartsModule

  ]
})
export class TerapiaFisicaModule { }
