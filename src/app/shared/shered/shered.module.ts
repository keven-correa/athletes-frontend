import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatTableModule} from '@angular/material/table';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatDialogModule} from '@angular/material/dialog';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSelectModule} from '@angular/material/select'
import {MatDividerModule} from '@angular/material/divider';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatListModule} from '@angular/material/list';
import {MatStepperModule} from '@angular/material/stepper';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatBottomSheetModule} from '@angular/material/bottom-sheet';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { SecretariaService } from '../../secretaria/services/secretaria.service';
import { NgChartsModule } from 'ng2-charts/lib/ng-charts.module';
import {MatRadioModule} from '@angular/material/radio';

@NgModule({
  declarations: [
    
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatButtonToggleModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatDialogModule,
    MatGridListModule,
    MatSelectModule,
    MatDividerModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatListModule, 
    MatStepperModule,
    MatSidenavModule,
    MatBottomSheetModule,
    // NgChartsModule,
    MatRadioModule
    
    

  ],
  exports:[
    MatToolbarModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatButtonToggleModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatDialogModule,
    MatGridListModule,
    MatSelectModule,
    MatDividerModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatListModule, 
    MatStepperModule,
    MatSidenavModule,
    MatBottomSheetModule,
    MatRadioModule

  ]
  ,
  providers:[
    //  {provide: HTTP_INTERCEPTORS,useClass:SecretariaService,multi:true}
  ]

})
export class SheredModule { }
