import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login.service';
import { LoginI } from '../../../shared/Models/login.interface';
import { ResponseI } from '../../../shared/Models/response.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario!: FormGroup;
  mensaje: boolean = false;
  data: any[] = [];

  constructor(private fb: FormBuilder,
    private router: Router,
    private loginservice: LoginService) { }

  ngOnInit(): void {
    this.formulario = this.fb.group({
      email: ['', [Validators.required]],
      password: ['', [Validators.required]]
    })
  }

  login() {
    // if(this.formulario.value.usuario==='admin'&& this.formulario.value.clave==='12345'){

    //   this.router.navigateByUrl('/admin/usuarios')
    // }
    // else if(this.formulario.value.usuario==='mgeneral'&& this.formulario.value.clave==='12345'){
    //   this.router.navigateByUrl('/medico-general/atletas')
    // }
    // else if(this.formulario.value.usuario==='tfisica'&& this.formulario.value.clave==='12345'){
    //   this.router.navigateByUrl('/terapia-fisica/atletas')
    // }

    // this.getUsuarios();
    console.log(this.formulario.value)
    const body = { email: this.formulario.value.email, password: this.formulario.value.password }
    this.loginservice.getUsuarios(body).subscribe(data => {
      const respuesta: any = data

      if (respuesta.role == "Administrator") {
        localStorage.setItem('token', respuesta.token)

        // this.router.navigateByUrl('/secretaria/atletas')
        window.location.replace('/administrador/usuarios')
      } else if (respuesta.role == "Secretary") {
        localStorage.setItem('token', respuesta.token)

        window.location.replace('/secretaria/atletas')
      }
      else if (respuesta.role == "MedicoGeneral") {
        localStorage.setItem('token', respuesta.token)

        window.location.replace('/medico-general/atletas')
      }
      else if (respuesta.role == "Fisioterapeuta") {
        localStorage.setItem('token', respuesta.token)

        window.location.replace('/terapia-fisica/atletas')
      }
    })

  }

  // getUsuarios(){
  //   this.loginservice.getUsuario().
  //   subscribe((resp)=>{
  //     let i=0;
  //     for (i = 0; i < resp.length; i++) {
  //       if(this.formulario.value.usuario==resp[i].usuario&&this.formulario.value.clave==resp[i].clave&&resp[i].rol==='administrador'){
  //         this.router.navigateByUrl('/admin/usuarios')
  //         this.mensaje=false
  //         return
  //       }
  //       else if(this.formulario.value.usuario==resp[i].usuario&&this.formulario.value.clave==resp[i].clave&&resp[i].rol==='medicoGeneral'){
  //         this.router.navigateByUrl('/medico-general/atletas')
  //         this.mensaje=false

  //         return
  //       }
  //       else if(this.formulario.value.usuario==resp[i].usuario&&this.formulario.value.clave==resp[i].clave&&resp[i].rol==='terapeutaFisico'){
  //         this.router.navigateByUrl('/terapia-fisica/atletas')
  //         this.mensaje=false

  //         return
  //       }
  //       else if(this.formulario.value.usuario==resp[i].usuario&&this.formulario.value.clave==resp[i].clave&&resp[i].rol==='secretaria'){
  //         this.router.navigateByUrl('/secretaria/atletas')
  //         this.mensaje=false

  //         return
  //       }
  //      else{
  //       this.mensaje=true
  //       }

  //     } 
  //     if(this.mensaje==true){
  //       this.mensajeError()

  //     }
  //   })


  // }


  mensajeError() {
    this.mensaje = true
    setTimeout(() => {
      this.mensaje = false
    }, 2000);
    return
  }
}


