import { NgModule } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { SeguridadGuard } from './medicoGeneral/guards/seguridad-medicoGeneral.guard';
import { SeguridadSecretariaGuard } from './secretaria/guards/seguridad-secretaria.guard';
import { SeguridadTerapiaFisicaGuard } from './terapia-fisica/guards/seguridad-terapia-fisica.guard';
import { SeguridadAdminGuard } from './administrador/guards/seguridad-admin.guard';


const routes: Routes = [
  {
    path:'login',
    loadChildren: ()=> import('./login/login/login.module').then(m=>m.LoginModule)
  },
  {
    path:'administrador',
    loadChildren: ()=> import('./administrador/admin.module').then(m=>m.AdminModule),
    canActivate:[SeguridadAdminGuard]
  },
  {
    path:'medico-general',
    loadChildren:()=>import('./medicoGeneral/medico-general.module').then(m=>m.MedicoGeneralModule)
    ,canActivate:[SeguridadGuard]
  },
  {
    path:'terapia-fisica',
    loadChildren:()=>import('./terapia-fisica/terapia-fisica.module').then(m=>m.TerapiaFisicaModule)
    ,canActivate:[SeguridadTerapiaFisicaGuard]    
  },
  {
    path:'secretaria',
    loadChildren:()=>import('./secretaria/secretaria.module').then(m=>m.SecretariaModule)
    ,canActivate:[SeguridadSecretariaGuard]

  },
  {
    path:'**',
    redirectTo:'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
