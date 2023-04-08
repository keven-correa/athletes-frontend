import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminServiceService } from '../../../services/admin-service.service';

@Component({
  selector: 'app-report-medico',
  templateUrl: './report-medico.component.html',
  styleUrls: ['./report-medico.component.css']
})
export class ReportMedicoComponent {


  id:any
  consultas:any
  NombreMedico:any
  RolMedico:any
  constructor(private adminService:AdminServiceService, private _ruta:ActivatedRoute){
    
  }

  ngOnInit(): void {
    this._ruta.params.subscribe(resp=>{
      this.id=resp['id'];      
    })
    this.adminService.ConsultasPorMedico(this.id).subscribe(resp=>{
      // console.log(resp)
      // this.consultas= resp[0].appointments

      this.NombreMedico = resp[0].firstName + " "+  resp[0].lastName

      this.RolMedico = resp[0].role
    })
    this.adminService.Consultas().subscribe(resp=>{
      console.log(resp)
      const filteredList = resp.filter((obj: any) => obj.created_by.id === Number(this.id));
      console.log(filteredList)
      this.consultas=filteredList
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
