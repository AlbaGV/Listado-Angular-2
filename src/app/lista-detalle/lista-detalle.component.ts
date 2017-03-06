import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {Detalle} from "../shared/model/detalle";

@Component({
  selector: 'lista-detalle',
  templateUrl: './lista-detalle.component.html',
  styleUrls: ['./lista-detalle.component.css']
})
export class ListaDetalleComponent implements OnInit {
  //Damos nombres a los array
  @Input()
  detalles: Detalle[];
  //Parte no funcional del trabajo
  @Output('detalle')
  detalleEmitter = new EventEmitter<Detalle>();

  constructor() { }

      ngOnInit() {

      }

    selectDetalle(detalle:Detalle) {
        this.detalleEmitter.emit(detalle);
    }

}
