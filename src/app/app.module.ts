import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule,FormsModule } from '@angular/forms';



import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/components/login/login.component';
import { SheredModule } from './shared/shered/shered.module';
import { UsuariosComponent } from './administrador/components/usuarios/usuarios.component';
import { AtletasComponent } from './medicoGeneral/atletas/atletas.component';
import { HistorialComponent } from './medicoGeneral/historial/historial.component';
import { DialogComponent } from './medicoGeneral/dialog/dialog.component';
import { MenuComponent } from './medicoGeneral/menu/menu.component';
import { ConsultasComponent } from './medicoGeneral/consultas/consultas.component';
import { ConsultaDetalleComponent } from './medicoGeneral/consulta-detalle/consulta-detalle.component';
import { AtletaDetalleComponent } from './medicoGeneral/atleta-detalle/atleta-detalle.component';
import { ConsultaAtletaComponent } from './medicoGeneral/consulta-atleta/consulta-atleta.component';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReportComponent } from './shered/report/report.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    UsuariosComponent,
    AtletasComponent,
    HistorialComponent,
    DialogComponent,
    MenuComponent,
    ConsultasComponent,
    ConsultaDetalleComponent,
    AtletaDetalleComponent,
    ConsultaAtletaComponent,
    ReportComponent,

  ],
  entryComponents:[DialogComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SheredModule,
    ReactiveFormsModule,
     HttpClientModule,    
  ],
  providers:[
    //  {provide: HTTP_INTERCEPTORS,useClass:SecretariaService,multi:true}
  ]
  ,
  bootstrap: [AppComponent]
})
export class AppModule { }
