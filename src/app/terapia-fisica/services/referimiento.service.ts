import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface Referimiento{
  id:number;
  idAtleta:number;
  atendidoPor:string;
  referidoPor:string;
  dxMedico:string;
  fecha:string;
}

interface Atleta {
  id: number;
  nombre: string;
  apellido: string;
  disciplina: string;
  edad: number;
  sexo: string;
  fechaNacimiento: string;
  lugarNacimiento: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReferimientoService {

  atletasReferidos:Atleta;

  constructor(private _http:HttpClient) {
    this.atletasReferidos={id:0,nombre:'',apellido:'',disciplina:'',edad:0,sexo:'',fechaNacimiento:'',lugarNacimiento:''}
   }

  getReferimientos():Observable<any[]>{
    return this._http.get<any[]>('../../assets/data/referimientos.json')
  }

  getAtletas():Observable<any[]>{
    
    return this._http.get<any[]>('../../assets/data/atletas.json')
  }


  filtrar(referimientos:Referimiento[],atleta:any):any{
    const atletasReferidos=referimientos
    const atletas= atleta
    console.log(atletas)
    atletasReferidos.filter(atleta=>atleta.idAtleta);
    for (let i = 0; i < atletas.length; i++) {
      const element = atletasReferidos[i].idAtleta;
      if(element!==atletas[i].id){
      }
      
      
    }

    

  }
}
