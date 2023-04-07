import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtletasComponent } from './atletas/atletas.component';
import { HistorialComponent } from './historial/historial.component';
import { ConsultasComponent } from './consultas/consultas.component';
import { ConsultaDetalleComponent } from './consulta-detalle/consulta-detalle.component';
import { AtletaDetalleComponent } from './atleta-detalle/atleta-detalle.component';
import { ConsultaAtletaComponent } from './consulta-atleta/consulta-atleta.component';
import { HistorialDetalleComponent } from './historial-detalle/historial-detalle.component';
import { TurnosComponent } from './turnos/turnos.component';
import { ReportComponent } from './report/report.component';
import { DashboardMedicoComponent } from './dashboard-medico/dashboard-medico.component';
import { LesionesDiadgosticadasComponent } from './dashboardReports/lesiones-diadgosticadas/lesiones-diadgosticadas.component';
import { ReportLesionesDiagnosticadasComponent } from './report-lesiones-diagnosticadas/report-lesiones-diagnosticadas.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {path:'atletas', component:AtletasComponent},
      {path:'historial/:id',component:HistorialComponent},
      {path:'historial-detalle/:id',component:HistorialDetalleComponent},
      {path:'consulta/:id', component:ConsultasComponent},
      {path:'datos-medicos/:id',component:ConsultaDetalleComponent},
      {path:'atleta-detalle/:id', component:AtletaDetalleComponent},
      {path:'consulta-atleta/:id', component:ConsultaAtletaComponent},
      {path:'turnos',component:TurnosComponent},
      
      {path:'dashboard',component:DashboardMedicoComponent},
      
      {path:'resumen', component:ReportComponent},
      {path:'lesionesDiadnosticadas', component:ReportLesionesDiagnosticadasComponent},
    ]
  },
  {
    path:'**',
    redirectTo:'atletas'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MedicoGeneralRoutingModule { }
