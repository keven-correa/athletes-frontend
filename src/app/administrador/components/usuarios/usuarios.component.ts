import { MediaMatcher } from '@angular/cdk/layout';
import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { AdminServiceService } from '../../services/admin-service.service';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements AfterViewInit {
  ELEMENT_DATA: any[] = [];
  usuarios:any;

  mobileQuery: MediaQueryList; 

  private _mobileQueryListener: () => void;

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'role','mas'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);


  constructor(private adminService:AdminServiceService,
    public dialog: MatDialog,
              private router:Router,
              changeDetectorRef: ChangeDetectorRef, media: MediaMatcher    
    ) { 

      this.mobileQuery = media.matchMedia('(max-width: 600px)');
      this._mobileQueryListener = () => changeDetectorRef.detectChanges();
      this.mobileQuery.addListener(this._mobileQueryListener);
    }

    ngOnDestroy(): void {
      this.mobileQuery.removeListener(this._mobileQueryListener);
    }
  
    shouldRun = true;
  
    ngAfterViewInit() {
      this.dataSource.paginator = this.paginator;
  
    }

  ngOnInit(): void {
    this.adminService.getUsuarios().subscribe(resp=>{
      this.usuarios=resp
      this.ELEMENT_DATA=resp
      this.dataSource.data=this.ELEMENT_DATA
    })
  }

  envio(id:number){
    this.router.navigate(['/secretaria/atleta-detalle', id])
    }

    applyFilter(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
      
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }

    nuevoUsuario(){
      this.router.navigate(['/administrador/nuevo-usuario'])
    }

     //Navegar en el menu
     turnos(){
      this.router.navigate(['/secretaria/turnos'])
    }

    atletasR(){
      this.router.navigate(['/secretaria/atletas'])
    }
    


    CerrarSesion(){

      this.adminService.logOut();
      this.router.navigate(['/login'])
    }


}
