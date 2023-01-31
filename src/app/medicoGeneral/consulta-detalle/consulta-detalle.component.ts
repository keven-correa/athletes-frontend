import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MedicoGeneralService } from '../services/medico-general.service';


interface atleta {
  nombre: string,
  apellido: string,
  edad: string;
  disciplina: string,
  sexo: string;
  estadoCivil: string,
  fechaNacimiento: string,
  lugarNacimiento: string,
  modalidad: string,
  edadDeportiva: string,
  horasPractica: string,
  diasPractica: string,
  seguroMedico: string,
  escolaridad: string,
  horasEstudio: string,
  diasEstudio: string,
  direccion: string,
  telefonoCelular: string,
  telefonoCasa: string,
  tipoSangre: string,
  peso: string,
  altura: string,
  TA: string,
  FC: string,
  FR: string,
  tempe: string,
  cedula: string
}

const ELEMENT_DATA: atleta[] = [
  // {id: 1, nombre: 'Antonio', apellido:'Guzman' , disciplina: 'Boxeo', sexo:'M'},
  // {id: 2, nombre: 'Manuel', apellido: 'Gonzalez' , disciplina: 'Basketball', sexo:'M'},
  // {id: 3, nombre: 'Juana', apellido: 'Castillo', disciplina: 'Baseball', sexo:'F'},
  // {id: 4, nombre: 'Saldy', apellido:'Amparo' , disciplina: 'Voleibol', sexo:'F'},
  // {id: 5, nombre: 'Nicol', apellido: 'Borbon' , disciplina: 'Atletismo', sexo:'F'},
  // {id: 6, nombre: 'Keven', apellido: 'Correa', disciplina: 'Natacion', sexo:'M'},
  // {id: 7, nombre: 'Edgar', apellido: 'Mena', disciplina: 'Natacion', sexo:'M'},
  // {id: 8, nombre: 'Julia', apellido: 'Ruiz', disciplina: 'Boxeo', sexo:'F'},
  // {id: 9, nombre: 'Joan', apellido:'Sena' , disciplina: 'Judo', sexo:'M'},
  // {id: 10, nombre: 'Daniel', apellido: 'Perez', disciplina: 'Boxeo', sexo:'M'},

];

@Component({
  selector: 'app-consulta-detalle',
  templateUrl: './consulta-detalle.component.html',
  styleUrls: ['./consulta-detalle.component.css']
})
export class ConsultaDetalleComponent implements OnInit {

  formularioDG!: FormGroup;
  formularioAFP!: FormGroup;
  formularioAP!: FormGroup;
  formularioATX!: FormGroup;
  formularioATQ!: FormGroup;
  formularioAL!: FormGroup;
  formularioAG!: FormGroup;
  formularioAM!: FormGroup;
  formularioALD!: FormGroup;


  atleta: atleta;


  id: number = 0;

  constructor(private _ruta: ActivatedRoute, private _formBuilder: FormBuilder, private medicoGeneralService: MedicoGeneralService) {
    this.atleta = {
      nombre: '',
      apellido: '',
      edad: '',
      disciplina: '',
      sexo: '',
      estadoCivil: '',
      fechaNacimiento: '',
      lugarNacimiento: '',
      modalidad: '',
      edadDeportiva: '',
      horasPractica: '',
      diasPractica: '',
      seguroMedico: '',
      escolaridad: '',
      horasEstudio: '',
      diasEstudio: '',
      direccion: '',
      telefonoCelular: '',
      telefonoCasa: '',
      tipoSangre: '',
      peso: '',
      altura: '',
      TA: '',
      FC: '',
      FR: '',
      tempe: '',
      cedula: '0'
    }

  }

  ngOnInit(): void {
    this._ruta.params.subscribe(resp => {
      this.id = resp['id'];
    })
    this._ruta.params.subscribe((params: Params) => {
      this.id = params['id'];
      this.formularioDG = this._formBuilder.group({
        idAtleta: [this.id],
        nombre: ['', Validators.required],
        apellido: ['', Validators.required],
        edad: ['', Validators.required],
        fechaNacimiento: ['', Validators.required],
        lugarNacimiento: ['', Validators.required],
        disciplina: ['', Validators.required],
        sexo: ['', Validators.required],
        estadoCivil: ['', Validators.required],
        modalidad: ['', Validators.required],
        edadDeportiva: ['', Validators.required],
        horasPractica: ['', Validators.required],
        diasPractica: ['', Validators.required],
        seguroMedico: [''],
        escolaridad: ['', Validators.required],
        horasEstudio: ['', Validators.required],
        diasEstudio: ['', Validators.required],
        direccion: ['', Validators.required],
        telefonoCelular: ['', Validators.required],
        telefonoCasa: ['', Validators.required],
        tipoSangre: ['', Validators.required],
        peso: ['', Validators.required],
        altura: ['', Validators.required],
        TA: ['', Validators.required],
        FC: ['', Validators.required],
        FR: ['', Validators.required],
        tempe: ['', Validators.required],
        cedula: ['']
      });

      this.formularioAFP = this._formBuilder.group({
        idAtleta: [this.id],
        HTA: ['', Validators.required],
        diabetes: ['', Validators.required],
        colesterol: ['', Validators.required],
        ACV: ['', Validators.required],
        asma: ['', Validators.required],
        renal: ['', Validators.required],
        gastrica: ['', Validators.required],
        IAM: ['', Validators.required],
        depresion: ['', Validators.required],
        psiquiatra: ['', Validators.required],
      })

      this.formularioAP = this._formBuilder.group({
        idAtleta: [this.id],
        sarampion: ['', Validators.required],
        varicela: ['', Validators.required],
        papera: ['', Validators.required],
        asmnap: ['', Validators.required],
        HTamigdalitisA: ['', Validators.required],
        hepatitisA: ['', Validators.required],
        falsemia: ['', Validators.required],
      });

      this.formularioATX = this._formBuilder.group({
        idAtleta: [this.id],
        cafe: ['', Validators.required],
        alcohol: ['', Validators.required],
        cigarros: ['', Validators.required],
        te: ['', Validators.required],
      });

      this.formularioATQ = this._formBuilder.group({
        idAtleta: [this.id],
        quirurgicos: ['', Validators.required],
        quirurgicosdetalle: [''],
      })

      this.formularioAL = this._formBuilder.group({
        idAtleta: [this.id],
        alergicos: ['', Validators.required],
        alergicosdetalle: [''],
      })

      this.formularioAG = this._formBuilder.group({
        idAtleta: [this.id],
        menarquia: [''],
        pubarquia: [''],
        FUM: [''],
        duracion: [''],
        dismenorrea: [''],
        manejo: [''],
        sexo2: [''],
        iniciorelaciones: [''],
        parejafija: [''],
        planificacion: [''],
        GPAC: [''],
        trasfornosEnMenstruacion: [''],
        secrecionAnormal: [''],
        color: [''],
      })

      this.formularioAM = this._formBuilder.group({
        idAtleta: [this.id],
        historiaPsicologa: ['', Validators.required],
        medicamentos: ['', Validators.required],
      })

      this.formularioALD = this._formBuilder.group({
        idAtleta: [this.id],
        contractura: ['', Validators.required],
        traumas: ['', Validators.required],
        esguinces: ['', Validators.required],
        heridas: ['', Validators.required],
        luxuaciones: ['', Validators.required],
        sinovitis: ['', Validators.required],
        fracturas: ['', Validators.required]
      })

    })

    this.cargarDatos(this.id);

  }

  cargarDatos(id: number) {

    const identificador: number = this.id;
    // this.medicoGeneralService.ObtenerAtletas().subscribe(resp => {
    //   for (let i = 0; i < resp.length; i++) {
    //     const element = resp[i];
    //     if (resp.find(item => item.id == identificador)) {
    //       this.atleta = resp.find(item => item.id == identificador)
    //       return this.formularioDG.patchValue({
    //         nombre: this.atleta.nombre,
    //         apellido: this.atleta.apellido,
    //         edad: this.atleta.edad,
    //         disciplina: this.atleta.disciplina,
    //         sexo: this.atleta.sexo,
    //         estadoCivil: this.atleta.estadoCivil,
    //         fechaNacimiento: this.atleta.fechaNacimiento,
    //         lugarNacimiento: this.atleta.lugarNacimiento,
    //         modalidad: this.atleta.modalidad,
    //         edadDeportiva: this.atleta.edadDeportiva,
    //         horasPractica: this.atleta.horasPractica,
    //         diasPractica: this.atleta.diasPractica,
    //         seguroMedico: this.atleta.seguroMedico,
    //         escolaridad: this.atleta.escolaridad,
    //         horasEstudio: this.atleta.horasEstudio,
    //         diasEstudio: this.atleta.diasEstudio,
    //         direccion: this.atleta.direccion,
    //         telefonoCelular: this.atleta.telefonoCelular,
    //         telefonoCasa: this.atleta.telefonoCasa,
    //         tipoSangre: this.atleta.tipoSangre,
    //         peso: this.atleta.peso,
    //         altura: this.atleta.altura,
    //         TA: this.atleta.TA,
    //         FC: this.atleta.FC,
    //         FR: this.atleta.FR,
    //         tempe: this.atleta.tempe,
    //         cedula: this.atleta.cedula
    //       })
    //     }
    //   }
    // })
  }

}


