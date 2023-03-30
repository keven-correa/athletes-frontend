import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AdminServiceService } from '../../services/admin-service.service';

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
      console.log(resp)
      this.consultas= resp[0].therapies
      this.NombreTerapeuta = resp[0].firstName + " "+  resp[0].lastName
      this.RolTerapeuta = resp[0].role
    })
    // this.adminService.ConsultasPorMedico(this.id).subscribe(resp=>{
    //   console.log(resp)
    //   this.consultas= resp[0].appointments


    // })
  }

  Volver(){
    window.history.back();
  }

  printChart() {
    window.print();
  }
}
