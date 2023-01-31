import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { collectionData, deleteDoc, doc, Firestore, getDoc, query, updateDoc, where } from '@angular/fire/firestore';
// import { addDoc, collection } from '@firebase/firestore';



@Injectable({
  providedIn: 'root'
})
export class MedicoGeneralService {

  // constructor( private http:HttpClient, private firestore:Firestore) { }

  // AgregarConsulta(consulta:any){
  //   const ref= collection(this.firestore,'Consultas');
  //   return addDoc(ref,consulta);
  // }

  // ObtenerAtletas():Observable<any[]>{
  //   const ref= collection(this.firestore,'Atletas');
  //    return collectionData(ref,{idField:"id"}) as Observable<any[]>;
    
  // } 
  // AgregarDatosMedicos(datosMedicos:any){
  //   const ref= collection(this.firestore,'DatosMedicos');
  //   return addDoc(ref,datosMedicos);
  // }
   

  // getAtletas():Observable<any[]>{
  //   return this.http.get<any[]>('../../assets/data/atletas.json')
  // }

  // addReferimiento(referimiento:any){
  //   return this.http.post<any>('../../assets/data/referimientos.json',referimiento)
  // }
}
