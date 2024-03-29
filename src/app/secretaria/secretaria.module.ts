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
// import { CrearTurnoComponent } from './components/crear-turno/crear-turno.component';
import { NuevoTurnoComponent } from './components/nuevo-turno/nuevo-turno.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SecretariaService } from './services/secretaria.service';
import { EditarTurnoComponent } from './components/editar-turno/editar-turno.component';


@NgModule({
  declarations: [
    MenuComponent,
    AtletasComponent,
    AtletasDetallesComponent,
    NuevoAtletaComponent,
    TurnosComponent,
    EditarAtletaComponent,
    // CrearTurnoComponent,
    NuevoTurnoComponent,
    EditarTurnoComponent
  ],
  imports: [
    CommonModule,
    SecretariaRoutingModule,
    SheredModule,
    FormsModule,
    ReactiveFormsModule
  ], 
  providers:[
    //  {provide: HTTP_INTERCEPTORS,useClass:SecretariaService,multi:true}
  ]
})
export class SecretariaModule { }
