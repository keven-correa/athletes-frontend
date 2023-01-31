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


@NgModule({
  declarations: [
    AtletasComponent,
    MenuComponent,
    AtletaDetalleComponent,
    ReferimientosComponent,
    HistorialComponent,
    TerapiaComponent,
    EvaluacionComponent,
    TerapiaDetalleComponent
  ],
  imports: [
    CommonModule,
    TerapiaFisicaRoutingModule,
    SheredModule,
    ReactiveFormsModule
  ]
})
export class TerapiaFisicaModule { }
