import { Component } from '@angular/core';
import Chart, { ChartOptions } from 'chart.js/auto';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent {
  chart!: Chart;

  ngOnInit(): void {
    const data = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [{
        label: 'Sales',
        data: [12, 19, 3, 5, 2, 3, 7],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }]
    };

    const options: ChartOptions<'line'> = {
      scales: {
        y: {
          beginAtZero: true
        }
      }
    };

    this.chart = new Chart('myChart', {
      type: 'line',
      data,
      options
    });
  }
}
