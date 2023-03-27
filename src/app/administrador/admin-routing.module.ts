import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import {  NuvoUsuarioComponent } from './components/nuevoUsuario/nuvo-usuario/nuvo-usuario.component';
import { DetallesUsuariosComponent } from './components/detallesUsuario/detalles-usuarios/detalles-usuarios.component';
import { ActualizarUsuarioComponent } from './components/actualizarUsuario/actualizar-usuario/actualizar-usuario.component';
import { DisciplinasComponent } from './components/disciplinas/disciplinas.component';
import { NuevaDisciplinaComponent } from './components/nueva-disciplina/nueva-disciplina.component';


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
