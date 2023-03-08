import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from '../components/usuarios/usuarios.component';
import {  NuvoUsuarioComponent } from '../components/nuevoUsuario/nuvo-usuario/nuvo-usuario.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {path:'usuarios', component:UsuariosComponent},
      {path:'nuevo-usuario', component:NuvoUsuarioComponent},
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
