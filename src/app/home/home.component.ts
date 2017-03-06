import { Component, OnInit } from '@angular/core';
import {DetallesService} from "../shared/model/detalles.service";
import {Detalle} from "../shared/model/detalle";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
//Damos nombres al array para que funcione el filtro
export class HomeComponent implements OnInit {

  allDetalles: Detalle[];
    filtered: Detalle[];

  constructor(private detallesService: DetallesService) {


  }
  //Informacion enviada a la consola
  ngOnInit() {
      this.detallesService.findAllDetalles()
          .do(console.log)
          .subscribe(
              detalles => this.allDetalles = this.filtered = detalles
          );

  }
  //Funcion del filtrado
    search(search:string) {

        this.filtered = this.allDetalles.filter(detalle => detalle.dueno.includes(search) );

    }

}
