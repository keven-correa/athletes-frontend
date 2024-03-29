import { Component, ViewChild, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { default as Annotation } from 'chartjs-plugin-annotation';
import { AdminServiceService } from 'src/app/administrador/services/admin-service.service';


@Component({
  selector: 'app-disciplinas-report',
  templateUrl: './disciplinas-report.component.html',
  styleUrls: ['./disciplinas-report.component.css']
})
export class DisciplinasReportComponent {

  public objeto:any=[]

  constructor(private adminService:AdminServiceService) {
    Chart.register(Annotation)
  }

  ngOnInit(): void {
    const etiquetas: any[] = [];
    const data: any[] = []
    this.adminService.TtoalDisciplinas().subscribe(resp=>{
      console.log(resp)

      for (let index = 0; index < resp.length; index++) {
        const element = resp[index].name;
        etiquetas.push(element);

        const datos = resp[index].athletes
        data.push(datos)


        const objeto={
          Disciplina: resp[index].name ,
          cantidad:resp[index].athletes
        }

        this.objeto.push(objeto)
        
        this.lineChartData.labels=etiquetas;
        this.lineChartData.datasets=[
          {
            data:data, 
            label:'Cantidad de atletas por disciplina'
          }
        ]
      }
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
    labels: [ ]
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
        position:'bottom'
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
