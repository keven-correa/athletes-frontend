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

  guardarUsuario(form: any): Observable<any> {
    const direccion = this.url + 'auth/register'
    return this.http.post<any>(direccion, form,this.options)
  }

  actualizarEstadoUsuario(id: any,estado:any): Observable<any> {
    const direccion = this.url + "auth/" + id
    return this.http.patch<any>(direccion,estado,this.options)
  }



  logOut() {
    localStorage.clear();
    window.location.replace('/login');

  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    return token !== null;
  }

}
