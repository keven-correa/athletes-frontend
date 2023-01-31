import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtletaDetalleComponent } from './terapiaFisica/components/atleta-detalle/atleta-detalle.component';
import { AtletasComponent } from './terapiaFisica/components/atletas/atletas.component';
import { EvaluacionComponent } from './terapiaFisica/components/evaluacion/evaluacion.component';
import { HistorialComponent } from './terapiaFisica/components/historial/historial.component';
import { ReferimientosComponent } from './terapiaFisica/components/referimientos/referimientos.component';
import { TerapiaDetalleComponent } from './terapiaFisica/components/terapia-detalle/terapia-detalle.component';
import { TerapiaComponent } from './terapiaFisica/components/terapia/terapia.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {path:'atletas',component:AtletasComponent},
      {path:'atleta-detalle/:id',component:AtletaDetalleComponent},
      {path:'referimientos/:id',component:ReferimientosComponent},
      {path:'historial/:id',component:HistorialComponent},
      {path:'terapia/:id',component:TerapiaComponent},
      {path:'terapia-detalle/:id',component:TerapiaDetalleComponent},
      {path:'evaluacion/:id',component:EvaluacionComponent}
    ]
  },
  {path:'**', redirectTo:'atletas'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TerapiaFisicaRoutingModule { }
