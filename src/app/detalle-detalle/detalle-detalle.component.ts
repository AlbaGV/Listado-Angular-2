//Parte no funcional de la aplicacion
import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {DetallesService} from "../shared/model/detalles.service";
import {Detalle} from "../shared/model/detalle";
import * as _ from 'lodash';


@Component({
    selector: 'app-detalle-detalle',
    templateUrl: './detalle-detalle.component.html',
    styleUrls: ['./detalle-detalle.component.css']
})
export class DetalleDetalleComponent implements OnInit {


    detalle:Detalle;

    constructor(private route:ActivatedRoute,
                private router:Router,
                private detallesService:DetallesService) {

        console.log('Detalle Detalle created');


    }


    ngOnInit() {

        this.route.params.switchMap(params => {

            const detalleUrl = params['id'];

            return this.detallesService.findDetalleByUrl(detalleUrl);
        })
        .subscribe(detalle => this.detalle = detalle);



    }

    next() {
        this.detallesService.loadNextDetalle(this.detalle.perroId,this.detalle.$key)
            .subscribe(this.navigateToDetalle.bind(this));
    }

    previous() {
        this.detallesService.loadPreviousDetalle(this.detalle.perroId,this.detalle.$key)
            .subscribe(this.navigateToDetalle.bind(this));
    }


    navigateToDetalle(detalle:Detalle) {
        this.router.navigate(['detalles', detalle.url]);
    }


    delete() {
        this.detallesService.deleteDetalle(this.detalle.$key)
            .subscribe(
                () => alert('Detalle eliminado'),
                console.error
            );
    }


    requestDetalleDeletion() {
        this.detallesService.requestDetalleDeletion(this.detalle.$key, this.detalle.perroId);
    }




}
