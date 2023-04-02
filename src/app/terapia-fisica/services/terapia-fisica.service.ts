import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { collectionData, collectionSnapshots, deleteDoc,  Firestore, getDoc, updateDoc } from '@angular/fire/firestore';
// import { addDoc, collection,where,query,doc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class TerapiaFisicaService {

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

  Referimientos(): Observable<any> {
    const direccion = this.url + "appointment"
    return this.http.get<any>(direccion,this.options)
  }
  NuevaEvaluacion(form:any): Observable<any> {
    const direccion = this.url + "evaluation"
    return this.http.post<any>(direccion,form,this.options)
  }

  EvaluacionesPorAtleta(id:any): Observable<any> {
    const direccion = this.url + "evaluation/evaluations-by-athlete/"+id
    return this.http.get<any>(direccion,this.options)
  }

  Evaluaciones(): Observable<any> {
    const direccion = this.url + "evaluation"
    return this.http.get<any>(direccion,this.options)
  }

  EvaluacionDetalle(id:any): Observable<any> {
    const direccion = this.url + "evaluation/"+id
    return this.http.get<any>(direccion,this.options)
  }

  NuevaTerapia(form:any): Observable<any> {
    const direccion = this.url + "therapy"
    return this.http.post<any>(direccion,form,this.options)
  }

  ConsultaDetalle(id:any): Observable<any> {
    const direccion = this.url + "appointment/"+id
    return this.http.get<any>(direccion,this.options)
  }

  TerapiasPorAtleta(id:any): Observable<any> {
    const direccion = this.url + "therapy/get-therapies-by-athlete/"+id
    return this.http.get<any>(direccion,this.options)
  }

    
  getTurnos() : Observable<any>{
    const direccion = this.url + "shifts";
    return this.http.get<any>(direccion, this.options)

  }

  EditarTurno(id: any,form:any): Observable<any> {
    const direccion = this.url + "shifts/" + id
    return this.http.patch<any>(direccion,form,this.options)
  }

  ObtenerTurnoById(id: any): Observable<any> {
    const direccion = this.url + "shifts/" + id
    return this.http.get<any>(direccion,this.options)
  }

  TerapiasPorDisciplina(id: any): Observable<any> {
    const direccion = this.url + "auth/get-athletes-count-discipline-therapies/" + id
    return this.http.get<any>(direccion)
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
