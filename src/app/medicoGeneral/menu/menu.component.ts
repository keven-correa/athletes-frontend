import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  atletas(){
    this.router.navigateByUrl('medico-general/atletas')
  }
  historial(){
    this.router.navigateByUrl('/medico-general/historial')
  }

  consultas(){
    this.router.navigateByUrl('/medico-general/consultas')
  }

}
