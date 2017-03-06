import {Component, OnInit} from '@angular/core';
import {PerrosService} from "../shared/model/perros.service";
import {Detalle} from "../shared/model/detalle";
import {Observable} from "rxjs/Rx";
import {ActivatedRoute, Router} from "@angular/router";
import {Perro} from "../shared/model/perro";


@Component({
    selector: 'app-perro-detalle',
    templateUrl: './perro-detalle.component.html',
    styleUrls: ['./perro-detalle.component.css']
})
export class PerroDetalleComponent implements OnInit {

    perro$:Observable<Perro>;
    detalles:Detalle[];

    perroUrl:string;

    constructor(
                private router: Router,
                private route:ActivatedRoute,
                private perrosService:PerrosService) {


    }
    //Damos nombres a diferentes parametros
    ngOnInit() {

        this.perroUrl = this.route.snapshot.params['id'];

        this.perro$ = this.perrosService.findPerroByUrl(this.perroUrl);

        const detalles$ = this.perrosService.loadFirstDetallesPage(this.perroUrl, 3);

        detalles$.subscribe(detalles => this.detalles = detalles);

    }
    //Paginacion
    next() {

        this.perrosService.loadNextPage(
            this.perroUrl,
            this.detalles[this.detalles.length - 1].$key,
            3
        )
        .subscribe(detalles => this.detalles = detalles);


    }


    previous() {

        this.perrosService.loadPreviousPage(
            this.perroUrl,
            this.detalles[0].$key,
            3
        )
            .subscribe(detalles => this.detalles = detalles);

    }

    navigateToDetalle(detalle:Detalle) {

        this.router.navigate(['detalles', detalle.url]);

    }




}
