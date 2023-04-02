import { Component, ViewChild, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import { default as Annotation } from 'chartjs-plugin-annotation';
import { AdminServiceService } from '../../services/admin-service.service';

@Component({
  selector: 'app-report-disciplinas',
  templateUrl: './report-disciplinas.component.html',
  styleUrls: ['./report-disciplinas.component.css']
})
export class ReportDisciplinasComponent implements OnInit {

  public objeto:any=[]

  // private newLabel? = 'New label';

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
      // annotation: {
      //   annotations: [
      //     {
      //       type: 'line',
      //       scaleID: 'x',
      //       value: 'March',
      //       borderColor: 'orange',
      //       borderWidth: 2,
      //       // label: {
      //       //   display: true,
      //       //   position: 'center',
      //       //   color: 'orange',
      //       //   content: 'LineAnno',
      //       //   font: {
      //       //     weight: 'bold'
      //       //   }
      //       // }
      //     },
      //   ],
      // }
    }
  };

  public lineChartType: ChartType = 'line';

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;



  Volver(){
    window.history.back();
  }


  printChart() {
    window.print();
  }

 }

