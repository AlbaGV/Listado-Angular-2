//Parte no funcional del programa

import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Detalle} from "../shared/model/detalle";
import {DetallesService} from "../shared/model/detalles.service";

@Component({
  selector: 'app-edit-detalle',
  templateUrl: './edit-detalle.component.html',
  styleUrls: ['./edit-detalle.component.css']
})
export class EditDetalleComponent implements OnInit {

  detalle:Detalle;

  constructor(private route: ActivatedRoute,
              private detallesService: DetallesService) {

      route.data
          .do(console.log)
          .subscribe(
          data => this.detalle = data['detalle']
      );

  }

  ngOnInit() {
  }


  save(detalle) {

      this.detallesService.saveDetalle(this.detalle.$key, detalle)
          .subscribe(
              () => {
                  alert("detalle guardado");
              },
              err => alert(`error detalle ${err}`)
          );

  }


}
