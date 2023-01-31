import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { collectionData, collectionSnapshots, deleteDoc,  Firestore, getDoc, updateDoc } from '@angular/fire/firestore';
// import { addDoc, collection,where,query,doc } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class TerapiaFisicaService {

  // constructor(private _http:HttpClient, private firestore:Firestore) { }

  // ObtenerAtletas():Observable<any[]>{
  //   const ref= collection(this.firestore,'Atletas');
  //    return collectionData(ref,{idField:"id"}) as Observable<any[]>;
    
  // }
  // ObtenerConsultas():Observable<any[]>{
  //   const ref= collection(this.firestore,'Consultas');
  //    return collectionData(ref) as Observable<any[]>;    
  // }
  // ObtenerTerapias():Observable<any[]>{
  //   const ref= collection(this.firestore,'Terapias');
  //    return collectionData(ref) as Observable<any[]>;    
  // }

  // AgregarTerapia(terapia:any){
  //   const ref= collection(this.firestore,'Terapias');
  //   return addDoc(ref,terapia);
  // }


  // getAtletas():Observable<any[]>{
  //   return this._http.get<any[]>('../../assets/data/atletas.json')
  // }

  // getAtletaDetalle():Observable<any[]>{
  //   return this._http.get<any[]>('../../assets/data/atletas.json')
  // }
}
