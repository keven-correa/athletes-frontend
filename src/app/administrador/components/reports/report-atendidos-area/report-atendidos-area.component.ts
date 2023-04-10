import { Component, ViewChild, OnInit } from '@angular/core';
import { ChartConfiguration, ChartData, ChartEvent, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';

import DataLabelsPlugin from 'chartjs-plugin-datalabels';
import { AdminServiceService } from 'src/app/administrador/services/admin-service.service';

import * as moment from 'moment';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-report-atendidos-area',
  templateUrl: './report-atendidos-area.component.html',
  styleUrls: ['./report-atendidos-area.component.css']
})
export class ReportAtendidosAreaComponent {

  citasMedico: any = {}
  citasTerapia: any = {}
  constructor(private adminService: AdminServiceService) {

  }
  ngOnInit(): void {
    // let citasPorDiaMedicog: any = {};
    // let citasPorDiaTerapeutaf: any = {};

    // this.adminService.Consultas().subscribe(resp => {
    //   const today = new Date();
    //   const lastWeekday = new Date();
    //   lastWeekday.setDate(today.getDate() - 1);
    //   while (lastWeekday.getDay() > 1 || lastWeekday.getDay() === 0) {
    //     lastWeekday.setDate(lastWeekday.getDate() - 1);
    //   }
    //   const lastFiveWeekdaysMedicoGeneralData = resp.filter((cita: any) => {
    //     const citaDate = new Date(cita.created_at);
    //     return (
    //       citaDate >= lastWeekday &&
    //       citaDate <= today &&
    //       citaDate.getDay() >= 1 &&
    //       citaDate.getDay() <= 5
    //     );
    //   });
    //   const citasPorDiaMedico: any = {};
    //   for (let i = 1; i <= 5; i++) {
    //     citasPorDiaMedico[i] = 0;
    //   }
    //   lastFiveWeekdaysMedicoGeneralData.forEach((cita: any) => {
    //     const citaDate = new Date(cita.created_at);
    //     citasPorDiaMedico[citaDate.getDay()] += 1;
    //   });
    //   citasPorDiaMedicog = Object.values(citasPorDiaMedico); // convertir a array
    //   console.log(citasPorDiaMedicog);
    // })

    // this.adminService.Terapias().subscribe(respuesta => {
    //   const today = new Date();

    //   const lastWeekday = new Date();
    //   lastWeekday.setDate(today.getDate() - 1);
    //   while (lastWeekday.getDay() > 1 || lastWeekday.getDay() === 0) {
    //     lastWeekday.setDate(lastWeekday.getDate() - 1);
    //   }

    //   const lastFiveWeekdaysMedicoGeneralData = respuesta.filter((cita: any) => {
    //     const citaDate = new Date(cita.created_at);
    //     return (
    //       citaDate >= lastWeekday &&
    //       citaDate <= today &&
    //       citaDate.getDay() >= 1 &&
    //       citaDate.getDay() <= 5
    //     );
    //   });
    //   const citasPorDiaTerapeuta: any = {};
    //   for (let i = 1; i <= 5; i++) {
    //     citasPorDiaTerapeuta[i] = 0;
    //   }
    //   lastFiveWeekdaysMedicoGeneralData.forEach((cita: any) => {
    //     const citaDate = new Date(cita.created_at);
    //     citasPorDiaTerapeuta[citaDate.getDay()] += 1;
    //   });
    //   citasPorDiaTerapeutaf = Object.values(citasPorDiaTerapeuta);
    //   console.log(citasPorDiaTerapeutaf)

    // this.barChartData = {
    //   labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'],
    //   datasets: [
    //     {
    //       data: citasPorDiaMedicog, label: 'Medicos'
    //     },
    //     {
    //       data: citasPorDiaTerapeutaf, label: 'Terapeutas'
    //     }
    //   ]
    // }
    // })


    this.semana();
    

  }



  public barChartData: ChartData<'bar'> = {
    labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'],
    datasets: [
      {
        data:
          [
            this.citasMedico
            // 65, 59, 80, 81, 56,
          ]
        , label: 'Medicos'
      },
      {
        data: [
          this.citasTerapia
          // 28, 48, 40, 19, 86,
        ],
        label: 'Terapeutas'
      }
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

  onRadioChange(event: any) {
    const selectedValue = event.value;
    switch (selectedValue) {
      case '1':
        // Lógica para mostrar la cantidad atendida en la última semana
        this.semana();
        break;
      case '2':
        // Lógica para mostrar la cantidad atendida en el último mes
        this.mes();
        break;
      case '3':
        // Lógica para mostrar la cantidad atendida en el último cuatrimestre
        this.cuatrimestre();

        break;
      default:
        break;
    }
  }

  semana() {
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

  mes() {
    this.adminService.Turnos().subscribe(resp => {
      console.log(resp)
      const today:any = new Date();
      const fourWeeksAgo = new Date();
      fourWeeksAgo.setDate(today.getDate() - 28);
      
      const weeks:any = {};
      
      resp.forEach((item:any) => {
        const createdDate:any = new Date(item.createdat);
        if (createdDate >= fourWeeksAgo) {
          const weekIndex = Math.floor((today - createdDate) / (7 * 24 * 60 * 60 * 1000));
          if (weekIndex >= 0 && weekIndex <= 3) {
            const weekStart = new Date(createdDate.getFullYear(), createdDate.getMonth(), createdDate.getDate() - createdDate.getDay());
            const weekEnd = new Date(weekStart.getFullYear(), weekStart.getMonth(), weekStart.getDate() + 6);
            const weekLabel = `${weekStart.toLocaleDateString()} - ${weekEnd.toLocaleDateString()}`;
            if (item.speciality === 'MedicoGeneral') {
              if (!weeks[weekLabel]) {
                weeks[weekLabel] = { medicoGeneral: 0, fisioterapeuta: 0 };
              }
              weeks[weekLabel]['medicoGeneral'] += 1;
            } else if (item.speciality === 'Fisioterapeuta') {
              if (!weeks[weekLabel]) {
                weeks[weekLabel] = { medicoGeneral: 0, fisioterapeuta: 0 };
              }
              weeks[weekLabel]['fisioterapeuta'] += 1;
            }
          }
        }
      });
      
      const sortedKeys = Object.keys(weeks).sort((a, b) => new Date(a.split(' - ')[0]).getTime() - new Date(b.split(' - ')[0]).getTime());
      
      const ultimosCuatroResultadosMedicoG = sortedKeys.map((key:any) => weeks[key]['medicoGeneral'] || 0);
      const ultimosCuatroResultadosFisio = sortedKeys.map((key:any) => weeks[key]['fisioterapeuta'] || 0);
      
      this.barChartData = {
        labels: sortedKeys,
        datasets: [
          {
            data: ultimosCuatroResultadosMedicoG,
            label: 'Médicos'
          },
          {
            data: ultimosCuatroResultadosFisio,
            label: 'Terapeutas'
          }
        ]
      };
      
      
  
      // // Filtrar los registros por especialidad y fecha
      // const medicoGeneralRegistros = resp.filter((r: any) => r.speciality === "MedicoGeneral" && new Date(Date.parse(r.createdat)) >= new Date(Date.now() - 28 * 24 * 60 * 60 * 1000));
      // const fisioterapeutaRegistros = resp.filter((r: any) => r.speciality === "Fisioterapeuta" && new Date(Date.parse(r.createdat)) >= new Date(Date.now() - 28 * 24 * 60 * 60 * 1000));
  
      // // Arreglo para almacenar la cantidad de registros por semana
      // const citasPorSemanaMedicog = [0, 0, 0, 0];
      // const citasPorSemanaTerapeutaf = [0, 0, 0, 0];
  
      // // Recorrer los registros filtrados y contar la cantidad por semana
      // medicoGeneralRegistros.forEach((resp:any) => {
      //   const semana = this.obtenerSemana(new Date(Date.parse(resp.createdat)));
      //   citasPorSemanaMedicog[semana - 1]++;
      // });
  
      // fisioterapeutaRegistros.forEach((r: any) => {
      //   const semana = this.obtenerSemana(new Date(Date.parse(r.createdat)));
      //   citasPorSemanaTerapeutaf[semana - 1]++;
      // });
  
      // console.log(`Cantidad de registros de médicos generales por semana: ${citasPorSemanaMedicog}`);
      // console.log(`Cantidad de registros de fisioterapeutas por semana: ${citasPorSemanaTerapeutaf}`);
  
      // const ultimosCuatroResultadosMedicoG = citasPorSemanaMedicog.slice(-4);
      // const ultimosCuatroResultadosFisio = citasPorSemanaTerapeutaf.slice(-4);
  
      // this.barChartData = {
      //   labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
      //   datasets: [
      //     {
      //       data: ultimosCuatroResultadosMedicoG, label: 'Médicos'
      //     },
      //     {
      //       data: ultimosCuatroResultadosFisio, label: 'Terapeutas'
      //     }
      //   ]
      // };
  
    });
  
  } 

  cuatrimestre(){
    this.adminService.Turnos().subscribe(resp=>{
      const today:any = new Date();
      const fourMonthsAgo = new Date();
      fourMonthsAgo.setMonth(today.getMonth() - 3);
      
      const months:any = [{}, {}, {}, {}];
      
      resp.forEach((item:any) => {
        const createdDate:any = new Date(item.createdat);
        if (createdDate >= fourMonthsAgo) {
          const monthIndex = Math.abs(today.getMonth() - createdDate.getMonth());
          if (monthIndex >= 0 && monthIndex <= 3) {
            if (item.speciality === 'MedicoGeneral') {
              months[monthIndex]['medicoGeneral'] = (months[monthIndex]['medicoGeneral'] || 0) + 1;
            } else if (item.speciality === 'Fisioterapeuta') {
              months[monthIndex]['fisioterapeuta'] = (months[monthIndex]['fisioterapeuta'] || 0) + 1;
            }
          }
        }
      });
      
      const ultimosCuatroResultadosMedicoG = months.map((month:any) => month.medicoGeneral || 0);
      const ultimosCuatroResultadosFisio = months.map((month:any) => month.fisioterapeuta || 0);
      
      this.barChartData = {
        labels: [
          `${new Date(fourMonthsAgo.getFullYear(), fourMonthsAgo.getMonth(), 1).toLocaleString('default', { month: 'long' })}`,
          `${new Date(today.getFullYear(), today.getMonth() - 2, 1).toLocaleString('default', { month: 'long' })}`,
          `${new Date(today.getFullYear(), today.getMonth() - 1, 1).toLocaleString('default', { month: 'long' })}`,
          `${new Date(today.getFullYear(), today.getMonth(), 1).toLocaleString('default', { month: 'long' })}`,
        ],
        datasets: [
          {
            data: ultimosCuatroResultadosMedicoG.reverse(),
            label: 'Médicos'
          },
          {
            data: ultimosCuatroResultadosFisio.reverse(),
            label: 'Terapeutas'
          }
        ]
      };
      

    })
   

  }
  





  // semana() {

  //   let citasPorDiaMedicog: any = {};
  //   let citasPorDiaTerapeutaf: any = {};

  //   this.adminService.Consultas().subscribe(resp => {
  //     const today = new Date();
  //     const lastWeekday = new Date();
  //     lastWeekday.setDate(today.getDate() - 1);
  //     while (lastWeekday.getDay() > 1 || lastWeekday.getDay() === 0) {
  //       lastWeekday.setDate(lastWeekday.getDate() - 1);
  //     }
  //     const lastFiveWeekdaysMedicoGeneralData = resp.filter((cita: any) => {
  //       const citaDate = new Date(cita.created_at);
  //       return (
  //         citaDate >= lastWeekday &&
  //         citaDate <= today &&
  //         citaDate.getDay() >= 1 &&
  //         citaDate.getDay() <= 5
  //       );
  //     });
  //     const citasPorDiaMedico: any = {};
  //     for (let i = 1; i <= 5; i++) {
  //       citasPorDiaMedico[i] = 0;
  //     }
  //     lastFiveWeekdaysMedicoGeneralData.forEach((cita: any) => {
  //       const citaDate = new Date(cita.created_at);
  //       citasPorDiaMedico[citaDate.getDay()] += 1;
  //     });
  //     citasPorDiaMedicog = Object.values(citasPorDiaMedico); // convertir a array
  //     console.log(citasPorDiaMedicog);
  //   })

  //   this.adminService.Terapias().subscribe(respuesta => {
  //     const today = new Date();

  //     const lastWeekday = new Date();
  //     lastWeekday.setDate(today.getDate() - 1);
  //     while (lastWeekday.getDay() > 1 || lastWeekday.getDay() === 0) {
  //       lastWeekday.setDate(lastWeekday.getDate() - 1);
  //     }

  //     const lastFiveWeekdaysMedicoGeneralData = respuesta.filter((cita: any) => {
  //       const citaDate = new Date(cita.created_at);
  //       return (
  //         citaDate >= lastWeekday &&
  //         citaDate <= today &&
  //         citaDate.getDay() >= 1 &&
  //         citaDate.getDay() <= 5
  //       );
  //     });
  //     const citasPorDiaTerapeuta: any = {};
  //     for (let i = 1; i <= 5; i++) {
  //       citasPorDiaTerapeuta[i] = 0;
  //     }
  //     lastFiveWeekdaysMedicoGeneralData.forEach((cita: any) => {
  //       const citaDate = new Date(cita.created_at);
  //       citasPorDiaTerapeuta[citaDate.getDay()] += 1;
  //     });
  //     citasPorDiaTerapeutaf = Object.values(citasPorDiaTerapeuta);
  //     console.log(citasPorDiaTerapeutaf)

  //     this.barChartData = {
  //       labels: ['Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes'],
  //       datasets: [
  //         {
  //           data: citasPorDiaMedicog, label: 'Medicos'
  //         },
  //         {
  //           data: citasPorDiaTerapeutaf, label: 'Terapeutas'
  //         }
  //       ]
  //     }
  //   })

  // }


  // mes() {
  //   let citasPorSemanaMedico: any = {};
  //   let citasPorSemanaTerapeuta: any = {};

  //   const consultasObservable = this.adminService.Consultas();
  //   const terapiasObservable = this.adminService.Terapias();

  //   forkJoin([consultasObservable, terapiasObservable]).subscribe(([resp, respuesta]) => {
  //     const today = moment();
  //     const lastMonth = moment().subtract(1, 'month');

  //     const last28DaysDataMedico = resp.filter((cita: any) => {
  //       const citaDate = moment.utc(cita.created_at, "YYYY-MM-DDTHH:mm:ss.SSSZ").local();
  //       return citaDate.isBetween(lastMonth, today, 'day', '[]');
  //     });

  //     const last28DaysDataTerapeuta = respuesta.filter((cita: any) => {
  //       const citaDate = moment.utc(cita.created_at, "YYYY-MM-DDTHH:mm:ss.SSSZ").local();
  //       return citaDate.isBetween(lastMonth, today, 'day', '[]');
  //     });

  //     const weeks = [moment().subtract(3, 'week'), moment().subtract(2, 'week'), moment().subtract(1, 'week'), moment()];

  //     weeks.forEach((week, i) => {
  //       citasPorSemanaMedico[`Semana ${i + 1}`] = last28DaysDataMedico.filter((cita: any) => {
  //         const citaDate = moment.utc(cita.created_at, "YYYY-MM-DDTHH:mm:ss.SSSZ").local();
  //         return citaDate.isBetween(moment(week).startOf('week').local(), moment(week).endOf('week').local(), 'day', '[]');
  //       }).length;

  //       citasPorSemanaTerapeuta[`Semana ${i + 1}`] = last28DaysDataTerapeuta.filter((cita: any) => {
  //         const citaDate = moment.utc(cita.created_at, "YYYY-MM-DDTHH:mm:ss.SSSZ").local();
  //         return citaDate.isBetween(moment(week).startOf('week').local(), moment(week).endOf('week').local(), 'day', '[]');
  //       }).length;
  //     });

  //     this.barChartData = {
  //       labels: ['Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'],
  //       datasets: [
  //         {
  //           data: Object.values(citasPorSemanaMedico),
  //           label: 'Medicos'
  //         },
  //         {
  //           data: Object.values(citasPorSemanaTerapeuta),
  //           label: 'Terapeutas'
  //         }
  //       ]
  //     };
  //   });
  // }


  // cuatrimestre() {
  //   let citasPorSemanaMedico: any = {};
  //   let citasPorSemanaTerapeuta: any = {};

  //   const consultasObservable = this.adminService.Consultas();
  //   const terapiasObservable = this.adminService.Terapias();

  //   forkJoin([consultasObservable, terapiasObservable]).subscribe(([resp, respuesta]) => {
  //     const today = moment();
  //     const fourMonthsAgo = moment().subtract(4, 'months');

  //     const last4MonthsDataMedico = resp.filter((cita: any) => {
  //       const citaDate = moment(cita.created_at, 'YYYY-MM-DDTHH:mm:ss[Z]');
  //       return citaDate.isSameOrAfter(fourMonthsAgo);
  //     });

  //     const last4MonthsDataTerapeuta = respuesta.filter((cita: any) => {
  //       const citaDate = moment(cita.created_at, 'YYYY-MM-DDTHH:mm:ss[Z]');
  //       return citaDate.isSameOrAfter(fourMonthsAgo);
  //     });

  //     const weeks = [
  //       moment().subtract(3, 'month'),
  //       moment().subtract(2, 'month'),
  //       moment().subtract(1, 'month'),
  //       moment()
  //     ];

  //     weeks.forEach((week, i) => {
  //       citasPorSemanaMedico[`Mes ${i + 1}`] = last4MonthsDataMedico.filter((cita: any) => {
  //         const citaDate = moment(cita.created_at, 'YYYY-MM-DDTHH:mm:ss[Z]');
  //         return citaDate.isSameOrAfter(week.startOf('month')) && citaDate.isBefore(week.clone().add(1, 'month').startOf('month'));
  //       }).length;

  //       citasPorSemanaTerapeuta[`Mes ${i + 1}`] = last4MonthsDataTerapeuta.filter((cita: any) => {
  //         const citaDate = moment(cita.created_at, 'YYYY-MM-DDTHH:mm:ss[Z]');
  //         return citaDate.isSameOrAfter(week.startOf('month')) && citaDate.isBefore(week.clone().add(1, 'month').startOf('month'));
  //       }).length;
  //     });

  //     this.barChartData = {
  //       labels: ['Mes 1', 'Mes 2', 'Mes 3', 'Mes 4'],
  //       datasets: [
  //         {
  //           data: Object.values(citasPorSemanaMedico),
  //           label: 'Medicos'
  //         },
  //         {
  //           data: Object.values(citasPorSemanaTerapeuta),
  //           label: 'Terapeutas'
  //         }
  //       ]
  //     };
  //   });

  // }


  Volver(){
    window.history.back();
  }


  printChart() {
    window.print();
  } 

}
