import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsuariosComponent } from '../usuarios/usuarios/usuarios.component';

const routes: Routes = [
  {
    path:'',
    children:[
      {path:'usuarios', component:UsuariosComponent}
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
