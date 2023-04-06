import { Component, OnInit } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { AdminServiceService } from 'src/app/administrador/services/admin-service.service';

@Component({
  selector: 'app-lesiones-report',
  templateUrl: './lesiones-report.component.html',
  styleUrls: ['./lesiones-report.component.css']
})
export class LesionesReportComponent implements OnInit {
  consultas: any = []
  total:any=[]


  constructor(private adminService: AdminServiceService) {

  }

  ngOnInit(): void {
    this.adminService.Consultas().subscribe(resp => {
      console.log(resp)
  
      const summary = resp.reduce((acc: any, curr: any) => {
        // Contabilizar cantidad de atletas diagnosticados por clasificación de diagnóstico
        const diagnostic = curr.diagnostic_classification.name;
        if (acc.diagnostic[diagnostic]) {
          acc.diagnostic[diagnostic]++;
        } else {
          acc.diagnostic[diagnostic] = 1;
        }
  
        // Contabilizar cantidad de atletas diagnosticados por disciplina
        const discipline = curr.athlete.discipline.name;
        if (acc.discipline[discipline]) {
          acc.discipline[discipline]++;
        } else {
          acc.discipline[discipline] = 1;
        }
  
        return acc;
      }, { diagnostic: {}, discipline: {} });
  
      console.log(summary);
  
      // Crear objeto para utilizar en un gráfico
      const totalByDiscipline: any = [];
      resp.forEach((item: any) => {
        const discipline = item.athlete.discipline.name;
        const index = totalByDiscipline.findIndex((d:any) => d.disciplina === discipline);
        if (index === -1) {
          totalByDiscipline.push({ disciplina: discipline, cantidad: 1 });
        } else {
          totalByDiscipline[index].cantidad++;
        }
      });
  
      console.log(totalByDiscipline);
  
      // Actualizar el gráfico
      this.polarAreaChartLabels = totalByDiscipline.map((d: any) => d.disciplina);
      this.polarAreaChartData = {
        labels: this.polarAreaChartLabels,
        datasets: [{
          data: totalByDiscipline.map((d: any) => d.cantidad),
          label: 'Lesiones'
        }]
      };
    })
  }
  
  // PolarArea
  public polarAreaChartLabels: string[] = [];
  public polarAreaChartData: ChartData<'polarArea'> = {
    labels: this.polarAreaChartLabels,
    datasets: [{
      data: [],
      label: 'Lesiones'
    }]
  };
  


  public polarAreaLegend = true;

  public polarAreaChartType: ChartType = 'polarArea';

  // events
  public chartClicked({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: ChartEvent, active: {}[] }): void {
    console.log(event, active);
  }

}
