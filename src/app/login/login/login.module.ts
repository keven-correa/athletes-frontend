import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { SheredModule } from "../../shared/shered/shered.module";



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LoginRoutingModule,
    MatToolbarModule,
    SheredModule
  ]
})
export class LoginModule { }
