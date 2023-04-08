import { Component, ViewChild, OnInit } from '@angular/core';
import { Chart, ChartConfiguration, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MedicoGeneralService } from '../services/medico-general.service';


@Component({
  selector: 'app-report-lesiones-diagnosticadas',
  templateUrl: './report-lesiones-diagnosticadas.component.html',
  styleUrls: ['./report-lesiones-diagnosticadas.component.css']
})
export class ReportLesionesDiagnosticadasComponent {

  consultas:any;
  constructor(private medicoGeneralService: MedicoGeneralService) {

  }
  ngOnInit(): void {

    const id = Number(localStorage.getItem("idMedico"))
    this.medicoGeneralService.Consultas().subscribe(resp => {
      console.log(resp)

      // console.log(resp.filter((x: any) => x.created_by.id === id).filter((y: any) => y.diagnostic_classification.name))

      const filteredList = resp.filter((obj: any) => obj.created_by.id === id);
      const diagnosisCount = filteredList.reduce((acc: any, obj: any) => {
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
          label: 'Lesiones diagnosticadas'
        }
      ];

      this.chart?.update();
    })


    this.medicoGeneralService.Consultas().subscribe(resp => {
      console.log(resp)
    
      const consultas = resp
        .filter((consulta: any) => consulta.created_by.id === id) // Filtrar consultas según el id del médico
        .map((consulta: any) => { // Crear un nuevo arreglo con la información de cada consulta
          return {
            diagnostico: consulta.diagnostic_classification ? consulta.diagnostic_classification.name : '',
            disciplina: consulta.athlete.discipline ? consulta.athlete.discipline.name : '',
            fecha: consulta.created_at,
            atleta: consulta.athlete.name + consulta.athlete.lastName
          }
        })    
      console.log(consultas)
      this.consultas=consultas;    
    });
    
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


  restarHoras(fecha: string): string {
    let date = new Date(fecha);
    date.setHours(date.getHours() - 4);
    return date.toISOString();
  }
  
  Volver(){
    window.history.back();
  }

  printChart() {
    window.print();
  }



  CerrarSesion(){

    this.medicoGeneralService.logOut();
    // this.router.navigate(['/login'])
  }

}
