import { Component, OnInit, ViewChild } from '@angular/core';
import { TerapiaFisicaService } from 'src/app/terapia-fisica/services/terapia-fisica.service';

import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';




@Component({
  selector: 'app-lesiones-diagnosticadas-medico',
  templateUrl: './lesiones-diagnosticadas-medico.component.html',
  styleUrls: ['./lesiones-diagnosticadas-medico.component.css']
})
export class LesionesDiagnosticadasMedicoComponent implements OnInit{

  constructor(private terapiafisicaService:TerapiaFisicaService){

  }
  ngOnInit(): void {
    this.terapiafisicaService.Referimientos().subscribe(resp=>{
      console.log(resp)

      const diagnosisCount = resp.reduce((acc: any, obj: any) => {
        const diagnosisName = obj.diagnostic_classification.name;
        if (diagnosisName in acc) {
          acc[diagnosisName]++;
        } else {
          acc[diagnosisName] = 1;
        }
        return acc;
      }, {});

      const etiquetas = Object.keys(diagnosisCount);
      const data: any = Object.values(diagnosisCount);

      this.lineChartData.labels = etiquetas;
      this.lineChartData.datasets = [
        {
          data: data,
          label: 'Cantidad de lesiones diagnosticadas'
        }
      ];
      this.chart?.update();

    })

  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        label: 'Atletas por disciplina',
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
        borderColor: '#FFFFFF', // Cambio de color a blanco
      },
    ],
    labels: []
  };



  public lineChartOptions: ChartConfiguration['options'] = {
    elements: {
      line: {
        tension: 0.3
      }
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y:
      {
        position: 'left',
      }
      //   ,
      // y1: {
      //   position: 'right',
      //   grid: {
      //     color: 'rgba(255,0,0,0.3)',
      //   },
      //   ticks: {
      //     color: 'red'
      //   }
      // }
    },

    plugins: {
      legend: {
        display: true,
        position: 'bottom'
      },
      datalabels: {
        color: '#FFF',
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels![ctx.dataIndex];
          const data = ctx.chart.data.datasets[0].data[ctx.dataIndex];
          return `${label} (${data})`;
        },
      },

    }
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  
}