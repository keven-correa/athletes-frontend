import { Component, ViewChild, OnInit } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MedicoGeneralService } from '../services/medico-general.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {
  public CantidadDisciplinas: string[] = [];

  constructor(private medicoGeneralService: MedicoGeneralService) { }

  ngOnInit(): void {
    const idMedico = localStorage.getItem("idMedico")
    console.log(idMedico)
    const etiquetas: any[] = [];
    const data: any[] = []
    this.medicoGeneralService.AtletasPorDisciplina(idMedico).subscribe(resp => {
      console.log(resp)

      for (let index = 0; index < resp.length; index++) {
        const element = resp[index].disciplinename
        etiquetas.push(element)

        const datos = resp[index].athletecount
        data.push(Number(datos))
      }

      this.pieChartData.labels = etiquetas;
      this.pieChartData.datasets = [
        {
          data: data,
          label: 'Atletas por disciplina',          
        }
      ];
      this.chart?.update();
    })


  }

  @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;

  public pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      datalabels: {
        formatter: (value, ctx) => {
          if (ctx.chart.data.labels) {
            return ctx.chart.data.labels[ctx.dataIndex];
          }
        },
      },
    }
  };
  public pieChartData: ChartData<'pie', number[], string | string[]> = {
    labels: [],
    datasets: [{
      data: []
    }]
  };
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];


  printChart() {
    window.print();
  }
  
}
