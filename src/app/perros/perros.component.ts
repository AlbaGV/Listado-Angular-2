import { Component, OnInit } from '@angular/core';
import {PerrosService} from "../shared/model/perros.service";
import {Observable} from "rxjs/Rx";
import {Perro} from "../shared/model/perro";

@Component({
  selector: 'app-perros',
  templateUrl: './perros.component.html',
  styleUrls: ['./perros.component.css']
})
export class PerrosComponent implements OnInit {

  perros$: Observable<Perro[]>;

  constructor(private perrosService: PerrosService) {

  }
  //Llamamos a todos los datos de la tabla perro
  ngOnInit() {

      this.perros$ = this.perrosService.findAllPerros();

  }

}
