import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtletaDetalleComponent } from './terapiaFisica/components/atleta-detalle/atleta-detalle.component';
import { AtletasComponent } from './terapiaFisica/components/atletas/atletas.component';
import { EvaluacionComponent } from './terapiaFisica/components/evaluacion/evaluacion.component';
import { HistorialComponent } from './terapiaFisica/components/historial/historial.component';
import { ReferimientosComponent } from './terapiaFisica/components/referimientos/referimientos.component';
import { TerapiaDetalleComponent } from './terapiaFisica/components/terapia-detalle/terapia-detalle.component';
import { TerapiaComponent } from './terapiaFisica/components/terapia/terapia.component';
import { EvaluacionesDetalleComponent } from './terapiaFisica/components/evaluaciones-detalle/evaluaciones-detalle.component';
import { NuevaTerapiaComponent } from './terapiaFisica/components/nueva-terapia/nueva-terapia.component';
import { EvaluacionesPorAtletaComponent } from './terapiaFisica/components/evaluaciones-por-atleta/evaluaciones-por-atleta.component';
import { TurnosComponent } from './terapiaFisica/components/turnos/turnos.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {path:'atletas',component:AtletasComponent},
      {path:'atleta-detalle/:id',component:AtletaDetalleComponent},
      {path:'referimientos',component:ReferimientosComponent},
      {path:'historial/:id',component:HistorialComponent},
      {path:'terapia/:id',component:TerapiaComponent},
      {path:'nueva-terapia/:id',component:NuevaTerapiaComponent},
      {path:'terapia-detalle/:id',component:TerapiaDetalleComponent},
      {path:'evaluacion/:id',component:EvaluacionComponent},
      {path:'evaluaciones-atleta/:id',component:EvaluacionesPorAtletaComponent},
      {path:'evaluacion-Detalle/:id',component:EvaluacionesDetalleComponent},
      {path:'turnos',component:TurnosComponent}
    ]
  },
  {path:'**', redirectTo:'atletas'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TerapiaFisicaRoutingModule { }
