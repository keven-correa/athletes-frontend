import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminServiceService } from '../../../services/admin-service.service';

@Component({
  selector: 'app-report-terapeuta',
  templateUrl: './report-terapeuta.component.html',
  styleUrls: ['./report-terapeuta.component.css']
})
export class ReportTerapeutaComponent {

  id:any
  consultas:any
  NombreTerapeuta:any
  RolTerapeuta:any
  constructor(private adminService:AdminServiceService, private _ruta:ActivatedRoute){
    
  }

  ngOnInit(): void {
    this._ruta.params.subscribe(resp=>{
      this.id=resp['id'];      
    })

    this.adminService.ConsultasPorTerapeuta(this.id).subscribe(resp=>{
      // console.log(resp)
      // this.consultas= resp[0].therapies
      this.NombreTerapeuta = resp[0].firstName + " "+  resp[0].lastName
      this.RolTerapeuta = resp[0].role
    })
    this.adminService.Terapias().subscribe(resp=>{
      console.log(resp)
      const filteredList = resp.filter((obj: any) => obj.created_by.id === Number(this.id));  
      this.consultas= filteredList.reverse()
      console.log(filteredList)
    })
  }

  calcularDiferenciaTiempo(fecha1: string, fecha2: string): string {
    const tiempo1 = new Date(fecha1).getTime() - (4 * 60 * 60 * 1000);
    const tiempo2 = new Date(fecha2).getTime();
    const diferencia = Math.abs(tiempo2 - tiempo1);
    if (diferencia >= 60 * 60 * 1000) {
      const horas = Math.floor(diferencia / 1000 / 60 / 60);
      const minutos = Math.floor((diferencia / 1000 / 60) % 60);
      return `${horas} hora${horas === 1 ? '' : 's'} ${minutos} minuto${minutos === 1 ? '' : 's'}`;
    } else {
      const minutos = Math.floor(diferencia / 1000 / 60);
      const segundos = Math.floor((diferencia / 1000) % 60);
      return `${minutos} minuto${minutos === 1 ? '' : 's'} ${segundos} segundo${segundos === 1 ? '' : 's'}`;
    }
  } 

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
}
