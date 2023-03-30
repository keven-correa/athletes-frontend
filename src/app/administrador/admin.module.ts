import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SheredModule } from 'src/app/shared/shered/shered.module';
import { NuvoUsuarioComponent } from './components/nuevoUsuario/nuvo-usuario/nuvo-usuario.component';
import { MenuComponent } from './components/menu/menu/menu.component';
import { DetallesUsuariosComponent } from './components/detallesUsuario/detalles-usuarios/detalles-usuarios.component';
import { ActualizarUsuarioComponent } from './components/actualizarUsuario/actualizar-usuario/actualizar-usuario.component';
import { DisciplinasComponent } from './components/disciplinas/disciplinas.component';
import { NuevaDisciplinaComponent } from './components/nueva-disciplina/nueva-disciplina.component';
import { ReportMedicoComponent } from './components/report-medico/report-medico.component';
import { ReportTerapeutaComponent } from './components/report-terapeuta/report-terapeuta.component';



@NgModule({
  declarations: [
    NuvoUsuarioComponent,
    MenuComponent,
    DetallesUsuariosComponent,
    ActualizarUsuarioComponent,
    DisciplinasComponent,
    NuevaDisciplinaComponent,
    ReportMedicoComponent,
    ReportTerapeutaComponent,

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
