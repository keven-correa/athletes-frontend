import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import {  NuvoUsuarioComponent } from './components/nuevoUsuario/nuvo-usuario/nuvo-usuario.component';
import { DetallesUsuariosComponent } from './components/detallesUsuario/detalles-usuarios/detalles-usuarios.component';
import { ActualizarUsuarioComponent } from './components/actualizarUsuario/actualizar-usuario/actualizar-usuario.component';
import { DisciplinasComponent } from './components/disciplinas/disciplinas.component';
import { NuevaDisciplinaComponent } from './components/nueva-disciplina/nueva-disciplina.component';
import { ReportMedicoComponent } from './components/report-medico/report-medico.component';
import { ReportTerapeutaComponent } from './components/report-terapeuta/report-terapeuta.component';
import { AtletasComponent } from './components/atletas/atletas.component';
import { NuevoAtletaComponent } from './components/nuevo-atleta/nuevo-atleta.component';
import { EditarAtletaComponent } from './components/editar-atleta/editar-atleta.component';
import { AtletasDetallesComponent } from './components/atletas-detalles/atletas-detalles.component';
import { ReportDisciplinasComponent } from './components/report-disciplinas/report-disciplinas.component';


const routes: Routes = [
  {
    path:'',
    children:[
      {path:'usuarios', component:UsuariosComponent},
      {path:'nuevo-usuario', component:NuvoUsuarioComponent},
      {path:'detallesUsuario/:id', component:DetallesUsuariosComponent},
      {path:'actualizarUsuario/:id', component:ActualizarUsuarioComponent},
      {path:'disciplinas', component:DisciplinasComponent},
      {path:'nuevaDisciplina', component:NuevaDisciplinaComponent},      
      {path:'reporteMedico/:id', component:ReportMedicoComponent},
      {path:'reporteTerapeuta/:id', component:ReportTerapeutaComponent},
      {path:'reporteDisciplinas', component:ReportDisciplinasComponent},
      {path:'atletas', component:AtletasComponent},
      {path:'nuevo-atleta', component:NuevoAtletaComponent},
      {path:'editar-atleta/:id',component:EditarAtletaComponent},
      {path:'atleta-detalle/:id',component:AtletasDetallesComponent},

    ]
  },
  {
    path:'**', redirectTo:'admin'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
