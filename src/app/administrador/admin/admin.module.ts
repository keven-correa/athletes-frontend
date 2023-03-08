import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SheredModule } from 'src/app/shared/shered/shered.module';
import { NuvoUsuarioComponent } from '../components/nuevoUsuario/nuvo-usuario/nuvo-usuario.component';
import { MenuComponent } from '../components/menu/menu/menu.component';


@NgModule({
  declarations: [
    NuvoUsuarioComponent,
    MenuComponent

  ],
  imports: [
    CommonModule,
    AdminRoutingModule,    
    SheredModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AdminModule { }
