import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';




@Injectable({
  providedIn: 'root'
})
export class MedicoGeneralService {

  url: string = "http://localhost:3000/api/"
  options: any;
  constructor(private http: HttpClient) {
    let token = localStorage.getItem("token");
    this.options = { headers: { 'Authorization': 'Bearer ' + token } }

  }

  getAtletas(): Observable<any> {
    const direccion = this.url + "athletes"
    console.log(direccion, this.options)
    return this.http.get<any>(direccion, this.options)
  }

  detalleAtleta(id: any): Observable<any> {
    const direccion = this.url + "athletes/" + id
    return this.http.get<any>(direccion,this.options)
  }

  Consultas(): Observable<any> {
    const direccion = this.url + "appointment"
    return this.http.get<any>(direccion,this.options)
  }

  NuevaConsulta(form:any): Observable<any> {
    const direccion = this.url + "appointment"
    return this.http.post<any>(direccion,form,this.options)
  }

  ConsultaById(id:any): Observable<any> {
    const direccion = this.url + "appointment/get-appointments-by-athlete/"+id
    return this.http.get<any>(direccion,this.options)
  }

  ConsultaDetalle(id:any): Observable<any> {
    const direccion = this.url + "appointment/"+id
    return this.http.get<any>(direccion,this.options)
  }


  logOut() {
    localStorage.clear();
  }

}
