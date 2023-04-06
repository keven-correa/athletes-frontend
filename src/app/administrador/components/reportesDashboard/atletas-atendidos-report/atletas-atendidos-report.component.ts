import { Component, ViewChild, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { AdminServiceService } from 'src/app/administrador/services/admin-service.service';

@Component({
  selector: 'app-atletas-atendidos-report',
  templateUrl: './atletas-atendidos-report.component.html',
  styleUrls: ['./atletas-atendidos-report.component.css']
})
export class AtletasAtendidosReportComponent implements OnInit {
  citasMedico:any={}
  citasTerapia:any={}
  constructor(private adminService: AdminServiceService) {

  }
  ngOnInit(): void {
    let citasPorDiaMedicog: any = {};
    let citasPorDiaTerapeutaf: any = {};

    this.adminService.Consultas().subscribe(resp => {
      const today = new Date();
      const lastWeekday = new Date();
      lastWeekday.setDate(today.getDate() - 1);
      while (lastWeekday.getDay() > 1 || lastWeekday.getDay() === 0) {
        lastWeekday.setDate(lastWeekday.getDate() - 1);
      }    
      const lastFiveWeekdaysMedicoGeneralData = resp.filter((cita: any) => {
        const citaDate = new Date(cita.created_at);
        return (
          citaDate >= lastWeekday &&
          citaDate <= today &&
          citaDate.getDay() >= 1 &&
          citaDate.getDay() <= 5
        );
      });    
      const citasPorDiaMedico: any = {};
      for (let i = 1; i <= 5; i++) {
        citasPorDiaMedico[i] = 0;
      }
      lastFiveWeekdaysMedicoGeneralData.forEach((cita: any) => {
        const citaDate = new Date(cita.created_at);
        citasPorDiaMedico[citaDate.getDay()] += 1;
      });
      citasPorDiaMedicog= Object.values(citasPorDiaMedico); // convertir a array
      console.log(citasPorDiaMedicog);
    })

    this.adminService.Terapias().subscribe(respuesta=>{
      const today = new Date();

      const lastWeekday = new Date();
      lastWeekday.setDate(today.getDate() - 1);
      while (lastWeekday.getDay() > 1 || lastWeekday.getDay() === 0) {
        lastWeekday.setDate(lastWeekday.getDate() - 1);
      }

      const lastFiveWeekdaysMedicoGeneralData = respuesta.filter((cita: any) => {
        const citaDate = new Date(cita.created_at);
        return (
          citaDate >= lastWeekday &&
          citaDate <= today &&
          citaDate.getDay() >= 1 &&
          citaDate.getDay() <= 5
        );
      });
      const citasPorDiaTerapeuta: any = {};
      for (let i = 1; i <= 5; i++) {
        citasPorDiaTerapeuta[i] = 0;
      }
      lastFiveWeekdaysMedicoGeneralData.forEach((cita: any) => {
        const citaDate = new Date(cita.created_at);
        citasPorDiaTerapeuta[citaDate.getDay()] += 1;
      });
      citasPorDiaTerapeutaf=Object.values(citasPorDiaTerapeuta);
      console.log(citasPorDiaTerapeutaf)

      this.barChartData={
        labels:['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'],
        datasets:[
          {
            data:citasPorDiaMedicog, label:'Medicos'
          },
          {
            data:citasPorDiaTerapeutaf,label:'Terapeutas'
          }
        ]
      }
    })
  }



  public barChartData: ChartData<'bar'> = {
    labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'],
    datasets: [
      { data: 
        [
          this.citasMedico
          // 65, 59, 80, 81, 56,
        ]
        , label: 'Medicos' },
      { data: [
        this.citasTerapia
        // 28, 48, 40, 19, 86,
      ],
       label: 'Terapeutas' }
    ]
  };
  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: {
      x: {},
      y: {
        min: 0
      }
    },
    plugins: {
      legend: {
        display: true,
      },
      datalabels: {
        anchor: 'end',
        align: 'end'
      }
    }
  };
  public barChartType: ChartType = 'bar';
  public barChartPlugins = [
    DataLabelsPlugin
  ];

  


 

  public randomize(): void {
    // Only Change 3 values
    this.barChartData.datasets[0].data = [
      Math.round(Math.random() * 100),
      59,
      80,
      Math.round(Math.random() * 100),
      56,
      Math.round(Math.random() * 100),
      40];

    this.chart?.update();
  }

}
