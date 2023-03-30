import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServiceService {

  url: string = "http://localhost:3000/api/"
  options: any;
  constructor(private http: HttpClient) {
    let token = localStorage.getItem("token");
    this.options = { headers: { 'Authorization': 'Bearer ' + token } }
  }

  getUsuarios(): Observable<any> {
    const direccion = this.url + "auth/list-users"
    return this.http.get<any>(direccion, this.options)
  }

  getUsuarioById(id:any): Observable<any> {
    const direccion = this.url + "auth/get-user/"+id
    return this.http.get<any>(direccion, this.options)
  }

  guardarUsuario(form: any): Observable<any> {
    const direccion = this.url + 'auth/register'
    return this.http.post<any>(direccion, form,this.options)
  }

  actualizarUsuario(id: any,form:any): Observable<any> {
    const direccion = this.url + "auth/update-user/" + id
    return this.http.patch<any>(direccion,form,this.options)
  }

  getDisciplinas(): Observable<any> {
    const direccion = this.url + "discipline/all"
    return this.http.get<any>(direccion, this.options)
  }

  guardarDisciplina(form: any): Observable<any> {
    const direccion = this.url + 'discipline'
    return this.http.post<any>(direccion, form,this.options)
  }

  logOut() {
    localStorage.clear();
    window.location.replace('/login');

  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token !== null;
  }


  getAtletas(): Observable<any> {
    const direccion = this.url + "athletes"
    return this.http.get<any>(direccion, this.options)
  }

  detalleAtleta(id: any): Observable<any> {
    const direccion = this.url + "athletes/" + id
    return this.http.get<any>(direccion,this.options)
  }

  guardarAtleta(form: any): Observable<any> {
    const direccion = this.url + 'athletes'
    return this.http.post<any>(direccion, form,this.options)
  }

  actualizarAtleta(id: any, form:any): Observable<any> {
    const direccion = this.url + "athletes/" + id
    return this.http.patch<any>(direccion,form,this.options)
  }


    ///Reporte
    ConsultasPorMedico(id:any): Observable<any> {
      const direccion = this.url + "auth/get-physician/"+id
      return this.http.get<any>(direccion)
    }

    ConsultasPorTerapeuta(id:any): Observable<any> {
      const direccion = this.url + "auth/get-physiotherapist-therapies-report/"+id
      return this.http.get<any>(direccion)
    }

}
