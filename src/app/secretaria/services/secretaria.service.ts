import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { collectionData, deleteDoc, doc, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';
// import { addDoc, collection,where,query } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class SecretariaService {

  // constructor(private http:HttpClient, private firestore:Firestore) { }

  // AgregarAtletas(atleta:any){
  //   const ref= collection(this.firestore,'Atletas');
  //   return addDoc(ref,atleta);
  // }

  // ObtenerAtletas():Observable<any[]>{
  //   const ref= collection(this.firestore,'Atletas');
  //    return collectionData(ref,{idField:"id"}) as Observable<any[]>;
    
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
}
