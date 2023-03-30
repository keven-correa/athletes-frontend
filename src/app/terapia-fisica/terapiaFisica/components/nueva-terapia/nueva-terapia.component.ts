import { MediaMatcher } from '@angular/cdk/layout';
import { ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { TerapiaFisicaService } from 'src/app/terapia-fisica/services/terapia-fisica.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-nueva-terapia',
  templateUrl: './nueva-terapia.component.html',
  styleUrls: ['./nueva-terapia.component.css']
})
export class NuevaTerapiaComponent {

  id: number = 0;
  idTerapeuta!: number
  formulario!: FormGroup;
  terapiasAtleta: any[] = []
  detallesEvaluacion: any;
  cantidadTerapiasRegistradas: any
  mobileQuery: MediaQueryList;

  btnNuevaTerapia: boolean = false;

  private _mobileQueryListener: () => void;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private fb: FormBuilder,
    public dialog: MatDialog,
    private _ruta: ActivatedRoute,
    private _terapiaFisicaService: TerapiaFisicaService,
    private router: Router,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher) {

    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
  }

  ngOnInit() {
    this._ruta.params.subscribe((params: Params) => {
      this.id = params['id'];

    });

    this.idTerapeuta = Number(localStorage.getItem('idTerapeuta'));

    this._terapiaFisicaService.EvaluacionDetalle(this.id).subscribe(resp => {

      this.detallesEvaluacion = resp
      console.log(resp)
    }, (error) => {
      // Manejo de errores HTTP
      if (error.status === 401) {

        this.mensajeError('Se ha producido un inconveniente al momento de la autenticacion, inicia sesion e intente de nuevo', 'error');
        this._terapiaFisicaService.logOut();
        this.router.navigate(['/login'])

      } else if (error.status === 403) {

        this.mensajeError('No tienes permiso para acceder a este componente.', 'warning');
        this.atletasR();
      } else if (error.status === 404) {
        this.mensajeError('Recurso no encontrado.', 'warning');

      } else if (error.status === 500) {
        this.mensajeError('Error en el servidor, intente nuevamente.', 'warning');

      } else {
        this.mensajeError('Error desconocido.', 'warning');

      }

    }
    )

    this._terapiaFisicaService.TerapiasPorAtleta(Number(localStorage.getItem('idAtleta'))).subscribe(resp => {
      console.log(resp, 'Cantidad')
      this.terapiasAtleta = resp

      this.cantidadTerapiasRegistradas = this.terapiasAtleta.filter(x => x.evaluation.id == this.id)
      console.log(this.cantidadTerapiasRegistradas)
    })

    this.formulario = this.fb.group({
      schedulingDate: [new Date, Validators.required],
      therapist: [this.idTerapeuta, Validators.required],
      remarks: ['', Validators.required],
      athlete: [Number(localStorage.getItem("idAtleta")), Validators.required],
      evaluation: [Number(this.id), Validators.required],

    })

    // console.log(Number((<HTMLInputElement>document.getElementById("tbxCantidadTerapiaR")).value) )
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  // Declara la función en el componente
  validarCantidadTerapiasRegistradas(): boolean {
    // Comprueba si las propiedades necesarias están definidas
    if (this.cantidadTerapiasRegistradas && this.detallesEvaluacion && this.detallesEvaluacion.numberOfTherapies) {
      // Comprueba si la longitud del array es menor que numberOfTherapies
      return this.cantidadTerapiasRegistradas.length < this.detallesEvaluacion.numberOfTherapies;
    } else {
      // Si alguna propiedad no está definida, devuelve false
      return false;
    }
  }


  //Navegar en el menu
  turnos(){
    this.router.navigate(['/terapia-fisica/turnos'])
  }

  atletasR(){
    this.router.navigate(['/terapia-fisica/atletas'])
  }

  referimientos(){
    this.router.navigate(['/terapia-fisica/referimientos'])

  }
  resumen(){
    this.router.navigate(['/terapia-fisica/resumen'])

  }

  guardar() {
    console.log(this.formulario.value)
    this._terapiaFisicaService.NuevaTerapia(this.formulario.value).subscribe(resp => {
      console.log(resp)
      this.router.navigateByUrl("/terapia-fisica/atletas")
    }, err => {
      console.log(err)
    })

  }

  mensajeError(mensaje: any, icono: any) {
    Swal.fire({
      title: mensaje,
      icon: icono,
      showCancelButton: false,
      confirmButtonColor: '#3085d6',
      confirmButtonText: 'Aceptar',
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('Ejecutando función...');
        // Lógica para ejecutar la función
      }
    }).then(() => {
      console.log('Modal cerrado');
      // Lógica que se ejecuta al cerrar el modal
    });
  }



}
