import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SecretariaRoutingModule } from './secretaria-routing.module';
import { MenuComponent } from './components/menu/menu.component';
import { SheredModule } from '../shared/shered/shered.module';
import { AtletasComponent } from './components/atletas/atletas.component';
import { AtletasDetallesComponent } from './components/atletas-detalles/atletas-detalles.component';
import { NuevoAtletaComponent } from './components/nuevo-atleta/nuevo-atleta.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TurnosComponent } from './components/turnos/turnos.component';
import { EditarAtletaComponent } from './components/editar-atleta/editar-atleta.component';
import { CrearTurnoComponent } from './components/crear-turno/crear-turno.component';
import { NuevoTurnoComponent } from './components/nuevo-turno/nuevo-turno.component';


@NgModule({
  declarations: [
    MenuComponent,
    AtletasComponent,
    AtletasDetallesComponent,
    NuevoAtletaComponent,
    TurnosComponent,
    EditarAtletaComponent,
    CrearTurnoComponent,
    NuevoTurnoComponent
  ],
  imports: [
    CommonModule,
    SecretariaRoutingModule,
    SheredModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SecretariaModule { }
