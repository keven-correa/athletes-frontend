import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SecretariaService {

  url: string = "http://localhost:3000/api/"
  options: any;
  constructor(private http: HttpClient) {
    let token = localStorage.getItem("token");
    this.options = { headers: { 'Authorization': 'Bearer ' + token } }
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

  getTurnos() : Observable<any>{
    const direccion = this.url + "shifts";
    return this.http.get<any>(direccion, this.options)

  }


  logOut() {
    localStorage.clear();
  }
}
