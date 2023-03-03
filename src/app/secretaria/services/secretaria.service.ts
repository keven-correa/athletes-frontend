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
    const direccion = this.url + "appointment";
    return this.http.get<any>(direccion, this.options)

  }

  // }  

  // eliminarAtleta(id:any){
  //   const ref= doc(this.firestore,`Atletas/${id}`);
  //   return deleteDoc(ref);
  // }

  // ActualizarAtleta(id:any,data:any){
  //   const ref= doc(this.firestore,`Atletas/${id}`);
  //   return updateDoc(ref,data);
  // }

  // getAtletas():Observable<any[]>{
  //   return this.http.get<any[]>('../../assets/data/atletas.json')
  // }

  // getTurnos():Observable<any[]>{
  //   return this.http.get<any[]>('../../assets/data/turnos.json')
  // }

  // AgregarTurno(turno:any){
  //   const ref= collection(this.firestore,'Turnos');
  //   return addDoc(ref,turno);
  // }

  // ObtenerTurnos():Observable<any[]>{
  //   const ref= collection(this.firestore,'Turnos');
  //    return collectionData(ref,{idField:"id"}) as Observable<any[]>;

  // } 

  logOut() {
    localStorage.clear();
  }
}
