


import {Resolve, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Detalle} from "./detalle";
import {Observable} from "rxjs/Rx";
import {Injectable} from "@angular/core";
import {DetallesService} from "./detalles.service";


@Injectable()
export class DetalleResolver implements Resolve<Detalle> {


    constructor(private detallesService: DetallesService) {

    }

    resolve(route:ActivatedRouteSnapshot,
            state:RouterStateSnapshot):Observable<Detalle> {

        return this.detallesService
            .findDetalleByUrl(route.params['id'])
            .first();
    }

}
