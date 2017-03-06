import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DetallesService} from "../shared/model/detalles.service";


@Component({
  selector: 'app-nuevo-detalle',
  templateUrl: './nuevo-detalle.component.html',
  styleUrls: ['./nuevo-detalle.component.css']
})
export class NuevoDetalleComponent implements OnInit {

  perroId:string;

  constructor(private route:ActivatedRoute, private detallesService: DetallesService) { }

  //Nos trae la ID del perro para meter nuevos datos alli
  ngOnInit() {

      this.perroId = this.route.snapshot.queryParams['perroId'];
      console.log("perro", this.perroId);
  }
  //Se envia los datos a validar, si todo esta correcto se crea el detalle y se limpia los campos
    save(form) {
        this.detallesService.createNewDetalle(this.perroId, form.value)
            .subscribe(
                () => {
                    alert("Detalle creado. Crear otro ?");
                    form.reset();
                },
                err => alert(`error creating lesson ${err}`)
            );

    }



}
