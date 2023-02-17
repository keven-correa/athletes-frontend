import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
// import { collectionData, deleteDoc, doc, Firestore, getDoc, updateDoc } from '@angular/fire/firestore';
// import { addDoc, collection,where,query } from '@firebase/firestore';

@Injectable({
  providedIn: 'root'
})
export class SecretariaService implements HttpInterceptor {

  url:string = "http://localhost:3000/api/"

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token =localStorage.getItem("token");
    let jwt=req.clone({
      setHeaders:{
        Autorization:'bearer '+ token
      }
    })
    console.log(token);
    console.log(jwt);
    return next.handle(jwt);
  }


   constructor(private http:HttpClient) { }

  

  getAtletas():Observable<any>{
    const direccion = this.url+"athletes"
   return this.http.get<any>(direccion)
  }

  detalleAtleta(id:any):Observable<any>{
    const direccion = this.url +"athletes/"+ id
   return this.http.get<any>(direccion)
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

  logOut(){
    localStorage.clear();
  }
}
