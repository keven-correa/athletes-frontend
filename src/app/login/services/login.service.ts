import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {catchError, map, tap} from 'rxjs/operators';
import { Observable } from 'rxjs';
import { LoginI } from '../../shared/Models/login.interface';
import { ResponseI } from 'src/app/shared/Models/response.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url:string = "https://athletes-backend-production.up.railway.app/api/auth/login"

  constructor(private httpclient:HttpClient) { }

  getUsuario():Observable<any[]>{
    
   return this.httpclient.get<any[]>('../../assets/data/usuarios.json');   
    
  }

  getUsuarios(form:LoginI):Observable<ResponseI>{
    const direccion = this.url
   return this.httpclient.post<ResponseI>(direccion,form)
  }

  validarTokenAdmin():boolean{
    const token = localStorage.getItem('token')
    const role = localStorage.getItem('role')
    let permiso:boolean;
    if(token != '' && role=='Administrator' )
    {
      permiso= true;
    }
    else{
      permiso=false
    }
    return permiso;

  }
}
