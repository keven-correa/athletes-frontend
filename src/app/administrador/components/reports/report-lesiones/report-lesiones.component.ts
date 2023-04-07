import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { AdminServiceService } from 'src/app/administrador/services/admin-service.service';

@Component({
  selector: 'app-report-lesiones',
  templateUrl: './report-lesiones.component.html',
  styleUrls: ['./report-lesiones.component.css']
})
export class ReportLesionesComponent {

  consultas: any = []
  total: any = []
  formulario!: FormGroup;
  objeto:any

  lesionesDisciplina:any

  disciplinas: any

  constructor(private adminService: AdminServiceService, private fb: FormBuilder,) {

  }


  ngOnInit(): void {

    this.formulario = this.fb.group({
      disciplina: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      fechaFin: ['', Validators.required],
    })

    this.adminService.Consultas().subscribe(resp => {
      const allDisciplines = resp.map((item: any) => item.athlete.discipline.name);
      const uniqueDisciplines = allDisciplines.filter((value: any, index: any, self: any) => self.indexOf(value) === index);

      
      this.disciplinas=uniqueDisciplines

      

      // const summary = resp.reduce((acc: any, curr: any) => {
      //   // Contabilizar cantidad de atletas diagnosticados por clasificación de diagnóstico
      //   const diagnostic = curr.diagnostic_classification.name;
      //   if (acc.diagnostic[diagnostic]) {
      //     acc.diagnostic[diagnostic]++;
      //   } else {
      //     acc.diagnostic[diagnostic] = 1;
      //   }

      //   // Contabilizar cantidad de atletas diagnosticados por disciplina
      //   const discipline = curr.athlete.discipline.name;
      //   if (acc.discipline[discipline]) {
      //     acc.discipline[discipline]++;
      //   } else {
      //     acc.discipline[discipline] = 1;
      //   }

      //   return acc;
      // }, { diagnostic: {}, discipline: {} });

      // console.log(summary);

      // Crear objeto para utilizar en un gráfico
      const totalByDiscipline: any = [];
      resp.forEach((item: any) => {
        const discipline = item.athlete.discipline.name;
        const index = totalByDiscipline.findIndex((d: any) => d.disciplina === discipline);
        if (index === -1) {
          totalByDiscipline.push({ disciplina: discipline, cantidad: 1 });
        } else {
          totalByDiscipline[index].cantidad++;
        }
      });
      this.objeto=totalByDiscipline      

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

    this.adminService.Consultas().subscribe(resp=>{

      const injuriesByDiscipline: any = [];

      resp.forEach((item: any) => {
        const discipline = item.athlete.discipline.name;
        const diagnostic = item.diagnostic_classification.name;
      
        const index = injuriesByDiscipline.findIndex((d: any) => d.disciplina === discipline);
      
        if (index === -1) {
          injuriesByDiscipline.push({
            disciplina: discipline,
            lesiones: [{ nombre: diagnostic, cantidad: 1 }],
          });
        } else {
          const injuryIndex = injuriesByDiscipline[index].lesiones.findIndex((i: any) => i.nombre === diagnostic);
      
          if (injuryIndex === -1) {
            injuriesByDiscipline[index].lesiones.push({ nombre: diagnostic, cantidad: 1 });
          } else {
            injuriesByDiscipline[index].lesiones[injuryIndex].cantidad++;
          }
        }
      });
      
      this.lesionesDisciplina=injuriesByDiscipline
      
       

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
  
  Buscar() {
    this.adminService.Consultas().subscribe(resp => {
  
      const startDate = new Date(this.formulario.value.fechaInicio); // fecha de inicio en formato Date
      const endDate = new Date(this.formulario.value.fechaFin); // fecha final en formato Date
      const discipline = this.formulario.value.disciplina; // disciplina a filtrar
  
      console.log(startDate, endDate, discipline)
      console.log(this.formulario.value)
  
      let filteredResp = resp.filter((item: any) => {
        const itemDate = new Date(item.created_at);
        const itemDateFormatted = itemDate.toISOString().slice(0, 10); // formatear la fecha en el formato "YYYY-MM-DD"
        return itemDateFormatted >= startDate.toISOString().slice(0, 10) && itemDateFormatted <= endDate.toISOString().slice(0, 10);
      });
  
      if (discipline !== "Todas") {
        filteredResp = filteredResp.filter((item: any) => {
          const itemDiscipline = item.athlete.discipline.name;
          return itemDiscipline === discipline;
        });
      }
  
      // Crear objeto para utilizar en un gráfico
      const totalByDiscipline: any = [];
      filteredResp.forEach((item: any) => {
        const discipline = item.athlete.discipline.name;
        const index = totalByDiscipline.findIndex((d: any) => d.disciplina === discipline);
        if (index === -1) {
          totalByDiscipline.push({ disciplina: discipline, cantidad: 1 });
        } else {
          totalByDiscipline[index].cantidad++;
        }
      });
      this.objeto=totalByDiscipline
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
    });
    
    // this.adminService.Consultas().subscribe((resp: any) => {
    //   const startDate = new Date(this.formulario.value.fechaInicio); // fecha de inicio en formato Date
    //   const endDate = new Date(this.formulario.value.fechaFin); // fecha final en formato Date
    //   const disciplineFilter = this.formulario.value.disciplina; // disciplina a filtrar
    
    //   const injuriesByDiscipline: any = [];
    
    //   resp.forEach((item: any) => {
    //     const discipline = item.athlete.discipline.name;
    //     const diagnostic = item.diagnostic_classification.name;
    //     const injuryDate = new Date(item.injury_date).toISOString().split('T')[0];
    
    //     const startDateFormatted = new Date(startDate.getFullYear(), startDate.getMonth(), startDate.getDate()).toISOString().split('T')[0];
    //     const endDateFormatted = new Date(endDate.getFullYear(), endDate.getMonth(), endDate.getDate()).toISOString().split('T')[0];
    
    //     if ((discipline === disciplineFilter || disciplineFilter === "Todas") &&
    //       injuryDate >= startDateFormatted && injuryDate <= endDateFormatted) {
    
    //       const index = injuriesByDiscipline.findIndex((d: any) => d.disciplina === discipline);
    
    //       if (index === -1) {
    //         injuriesByDiscipline.push({
    //           disciplina: discipline,
    //           lesiones: [{ nombre: diagnostic, cantidad: 1 }],
    //         });
    //       } else {
    //         const injuryIndex = injuriesByDiscipline[index].lesiones.findIndex((i: any) => i.nombre === diagnostic);
    
    //         if (injuryIndex === -1) {
    //           injuriesByDiscipline[index].lesiones.push({ nombre: diagnostic, cantidad: 1 });
    //         } else {
    //           injuriesByDiscipline[index].lesiones[injuryIndex].cantidad++;
    //         }
    //       }
    //     }
    //   });
    //   console.log(injuriesByDiscipline)
    //   this.lesionesDisciplina = injuriesByDiscipline;
    // });
    
    
  }


  Volver(){
    window.history.back();
  }


  printChart() {
    window.print();
  }
  

}
