import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MedicoGeneralRoutingModule } from './medico-general-routing.module';
import { SheredModule } from '../shared/shered/shered.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MedicoGeneralRoutingModule, 
    SheredModule
  ]
})
export class MedicoGeneralModule { }
