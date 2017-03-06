import {Injectable} from '@angular/core';
import {AngularFireDatabase} from "angularfire2";
import {Observable} from "rxjs/Rx";
import {Perro} from "./perro";
import {Detalle} from "./detalle";
import {FirebaseListFactoryOpts} from "angularfire2/interfaces";

@Injectable()
export class PerrosService {


    constructor(private db:AngularFireDatabase) {
    }
 //Todos los perros
    findAllPerros():Observable<Perro[]> {
        return this.db.list('perro').map(Perro.fromJsonArray);
    }

//Perro por URL
    findPerroByUrl(perroUrl:string): Observable<Perro> {
        return this.db.list('perro', {
            query: {
                orderByChild: 'url',
                equalTo: perroUrl
            }
        })
        .map(results => results[0]);
    }

//Identificar cada dueño por su perro
    findDetalleKeysPerPerroUrl(perroUrl:string,
                               query: FirebaseListFactoryOpts = {}): Observable<string[]> {
        return this.findPerroByUrl(perroUrl)
            .do(val => console.log("perro",val))
            .filter(perro => !!perro)
            .switchMap(perro => this.db.list(`detallesporperro/${perro.$key}`,query))
            .map( lspc => lspc.map(lpc => lpc.$key) );
    }

//No funcional
    findDetallesForDetalleKeys(detalleKeys$: Observable<string[]>) :Observable<Detalle[]> {
        return detalleKeys$
            .map(lspc => lspc.map(detalleKey => this.db.object('detalles/' + detalleKey)) )
            .flatMap(fbojs => Observable.combineLatest(fbojs) )

    }

//Todos los dueño que tenga un perro
    findAllDetallesForPerro(perroUrl:string):Observable<Detalle[]> {
        return this.findDetallesForDetalleKeys(this.findDetalleKeysPerPerroUrl(perroUrl));
    }

//PAginacion
    loadFirstDetallesPage(perroUrl:string, pageSize:number): Observable<Detalle[]> {

        const firstPageDetalleKeys$ = this.findDetalleKeysPerPerroUrl(perroUrl,
            {
                query: {
                    limitToFirst:pageSize
                }
            });

        return this.findDetallesForDetalleKeys(firstPageDetalleKeys$);
    }




    loadNextPage(perroUrl:string,
                 detalleKey:string, pageSize:number): Observable<Detalle[]> {

        const detalleKeys$ = this.findDetalleKeysPerPerroUrl(perroUrl,
            {
                query: {
                    orderByKey: true,
                    startAt: detalleKey,
                    limitToFirst:pageSize + 1
                }
            });

        return this.findDetallesForDetalleKeys(detalleKeys$)
            .map(detalles => detalles.slice(1, detalles.length));


    }

    loadPreviousPage(perroUrl:string,
                     detalleKey:string, pageSize:number): Observable<Detalle[]> {


        const detalleKeys$ = this.findDetalleKeysPerPerroUrl(perroUrl,
            {
                query: {
                    orderByKey: true,
                    endAt: detalleKey,
                    limitToLast:pageSize + 1
                }
            });

        return this.findDetallesForDetalleKeys(detalleKeys$)
            .map(detalles => detalles.slice(0, detalles.length - 1));

    }


}
