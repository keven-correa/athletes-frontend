import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtletasComponent } from '../atletas/atletas.component';
import { HistorialComponent } from '../historial/historial.component';
import { ConsultasComponent } from '../consultas/consultas.component';
import { ConsultaDetalleComponent } from '../consulta-detalle/consulta-detalle.component';
import { AtletaDetalleComponent } from '../atleta-detalle/atleta-detalle.component';
import { ConsultaAtletaComponent } from '../consulta-atleta/consulta-atleta.component';
import { AnaliticaComponent } from '../analitica/analitica.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {path:'atletas', component:AtletasComponent},
      {path:'historial/:id',component:HistorialComponent},
      // {path:'consultas', component:ConsultasComponent},
      {path:'datos-medicos/:id',component:ConsultaDetalleComponent},
      {path:'atleta-detalle/:id', component:AtletaDetalleComponent},
      {path:'consulta-atleta/:id', component:ConsultaAtletaComponent},
      {path:'analitica/:id',component:AnaliticaComponent}
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
