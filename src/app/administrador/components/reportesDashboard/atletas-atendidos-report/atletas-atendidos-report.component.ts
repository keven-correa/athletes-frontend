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
    this.adminService.Turnos().subscribe(resp => {
      console.log(resp)
      // Filtrar los registros por especialidad y fecha
      const medicoGeneralRegistros = resp.filter((r: any) => r.speciality === "MedicoGeneral" && new Date(r.createdat) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
      const fisioterapeutaRegistros = resp.filter((r: any) => r.speciality === "Fisioterapeuta" && new Date(r.createdat) >= new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));

      // Arreglo para almacenar la cantidad de registros por día de la semana
      const citasPorDiaMedicog = [0, 0, 0, 0, 0, 0, 0];
      const citasPorDiaTerapeutaf = [0, 0, 0, 0, 0, 0, 0];

      // Recorrer los registros filtrados y contar la cantidad por día de la semana
      medicoGeneralRegistros.forEach((r: any) => {
        const dia = new Date(r.createdat).getDay();
        citasPorDiaMedicog[dia]++;
      });

      fisioterapeutaRegistros.forEach((r: any) => {
        const dia = new Date(r.createdat).getDay();
        citasPorDiaTerapeutaf[dia]++;
      });

      console.log(`Cantidad de registros de médicos generales por día de la semana: ${citasPorDiaMedicog}`);
      console.log(`Cantidad de registros de fisioterapeutas por día de la semana: ${citasPorDiaTerapeutaf}`);


      this.barChartData = {
        labels: ['Domingo','Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
        datasets: [
          {
            data: citasPorDiaMedicog, label: 'Médicos'
          },
          {
            data: citasPorDiaTerapeutaf, label: 'Terapeutas'
          }
        ]
      };

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


}
