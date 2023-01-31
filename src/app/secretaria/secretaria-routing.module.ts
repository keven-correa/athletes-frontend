import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AtletasDetallesComponent } from './components/atletas-detalles/atletas-detalles.component';
import { AtletasComponent } from './components/atletas/atletas.component';
import { EditarAtletaComponent } from './components/editar-atleta/editar-atleta.component';
import { NuevoAtletaComponent } from './components/nuevo-atleta/nuevo-atleta.component';
import { TurnosComponent } from './components/turnos/turnos.component';
import { CrearTurnoComponent } from './components/crear-turno/crear-turno.component';
import { NuevoTurnoComponent } from './components/nuevo-turno/nuevo-turno.component';
import { AutenticacionGuard } from '../shared/guard/autenticacion.guard';

const routes: Routes = [
  {
    path:'',
    children:[
      {path:'atletas', component:AtletasComponent},
      {path:'atleta-detalle/:id',component:AtletasDetallesComponent},
      {path:'nuevo-atleta', component:NuevoAtletaComponent},
      {path:'turnos',component:TurnosComponent},
      {path:'editar-atleta/:id',component:EditarAtletaComponent},
      {path:'nuevo-turno',component:CrearTurnoComponent},
      {path:'crear-turno/id',component:NuevoTurnoComponent},
    ] 

    
  },
  {
    path:'**', redirectTo:'atletas'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SecretariaRoutingModule { }
