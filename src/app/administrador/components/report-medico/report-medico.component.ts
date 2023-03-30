import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminServiceService } from '../../services/admin-service.service';

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
      console.log(resp)
      this.consultas= resp[0].appointments

      this.NombreMedico = resp[0].firstName + " "+  resp[0].lastName

      this.RolMedico = resp[0].role
    })
  }

  Volver(){
    window.history.back();
  }

  printChart() {
    window.print();
  }
}
