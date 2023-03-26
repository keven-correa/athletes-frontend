import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicoGeneralRoutingModule } from './medico-general-routing.module';
import { SheredModule } from '../shared/shered/shered.module';
import { HistorialDetalleComponent } from './historial-detalle/historial-detalle.component';
import { TurnosComponent } from './turnos/turnos.component';



@NgModule({
  declarations: [
    HistorialDetalleComponent,
    TurnosComponent,
  ],
  imports: [
    CommonModule,
    MedicoGeneralRoutingModule, 
    SheredModule
    
  ]
})
export class MedicoGeneralModule { }
