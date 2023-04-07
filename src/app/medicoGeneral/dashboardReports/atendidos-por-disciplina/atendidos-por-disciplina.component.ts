import { Component, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import DatalabelsPlugin from 'chartjs-plugin-datalabels';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MedicoGeneralService } from '../../services/medico-general.service';

@Component({
  selector: 'app-atendidos-por-disciplina',
  templateUrl: './atendidos-por-disciplina.component.html',
  styleUrls: ['./atendidos-por-disciplina.component.css']
})
export class AtendidosPorDisciplinaComponent {

  public CantidadDisciplinas: string[] = [];
  public NombresDisciplinas: string[] = [];
  public objeto:any=[]

  mobileQuery: MediaQueryList; 

  private _mobileQueryListener: () => void;

  constructor(public dialog: MatDialog,
    private router:Router,
    private medicoGeneralService:MedicoGeneralService,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher){

      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);

}

ngOnDestroy(): void {
this.mobileQuery.removeListener(this._mobileQueryListener);
}

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
        this.NombresDisciplinas.push(element)
        const datos = resp[index].athletecount 
        data.push(Number(datos))
        this.CantidadDisciplinas.push(datos)

        const objeto={
          Disciplina:resp[index].disciplinename,
          cantidad:resp[index].athletecount
        }

        this.objeto.push(objeto)

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
        position: 'bottom',
      },
      datalabels: {
        color: '#FFF',
        formatter: (value, ctx) => {
          const label = ctx.chart.data.labels![ctx.dataIndex];
          const data = ctx.chart.data.datasets[0].data[ctx.dataIndex];
          return `${label} (${data})`;
        },
      },
    },
  };
  
  public pieChartData: ChartData<'pie', number[], string> = {
    labels: [],
    datasets: [
      {
        data: [],
        label: 'Atletas por disciplina',
        backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      },
    ],
  };
  
  public pieChartType: ChartType = 'pie';
  public pieChartPlugins = [DatalabelsPlugin];

}
