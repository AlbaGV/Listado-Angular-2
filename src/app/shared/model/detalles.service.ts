import {Injectable, Inject} from '@angular/core';
import {Observable, Subject} from "rxjs/Rx";
import {Detalle} from "./detalle";
import {AngularFireDatabase, FirebaseRef} from "angularfire2";
import {Http} from "@angular/http";
import {firebaseConfig} from "../../../environments/firebase.config";


@Injectable()
export class DetallesService {

    sdkDb:any;

    constructor(private db:AngularFireDatabase, @Inject(FirebaseRef) fb,
                private http:Http) {

        this.sdkDb = fb.database().ref();

    }
    //Todos los detalles (dueño)

    findAllDetalles():Observable<Detalle[]> {

        return this.db.list('detalles')
            .do(console.log)
            .map(Detalle.fromJsonList);

    }
    //Todos los detalles por URL (para pagina detalle)
    findDetalleByUrl(url:string):Observable<Detalle> {
        return this.db.list('detalles', {
            query: {
                orderByChild: 'url',
                equalTo: url
            }
        })
        .filter(results => results && results.length > 0)
        .map(results => Detalle.fromJson(results[0]))
        .do(console.log);
    }

    //Paginacion
    loadNextDetalle(perroId:string, detalleId:string):Observable<Detalle> {
        return this.db.list(`detallesporperro/${perroId}`, {
            query: {
                orderByKey:true,
                startAt: detalleId,
                limitToFirst: 2
            }
        })
        .filter(results => results && results.length > 0)
        .map(results => results[1].$key)
        .switchMap(detalleId => this.db.object(`detalles/${detalleId}`))
        .map(Detalle.fromJson);
    }


    loadPreviousDetalle(perroId:string, detalleId:string):Observable<Detalle> {
        return this.db.list(`detallesporperro/${perroId}`, {
            query: {
                orderByKey:true,
                endAt: detalleId,
                limitToLast: 2
            }
        })
        .filter(results => results && results.length > 0)
        .map(results => results[0].$key)
        .switchMap(detalleId => this.db.object(`detalles/${detalleId}`))
        .map(Detalle.fromJson);

    }
    //Funcion crear nuevo dueño
    createNewDetalle(perroId:string, detalle:any): Observable<any> {

        const detalleToSave = Object.assign({}, detalle, {perroId});

        const newDetalleKey = this.sdkDb.child('detalles').push().key;

        let dataToSave = {};

        dataToSave["detalles/" + newDetalleKey] = detalleToSave;
        dataToSave[`detallesporperro/${perroId}/${newDetalleKey}`] = true;


        return this.firebaseUpdate(dataToSave);
    }
    //Modificar firebase
    firebaseUpdate(dataToSave) {
        const subject = new Subject();

        this.sdkDb.update(dataToSave)
            .then(
                val => {
                    subject.next(val);
                    subject.complete();

                },
                err => {
                    subject.error(err);
                    subject.complete();
                }
            );

        return subject.asObservable();
    }

    //Ingresar nuevo valor en firebase
    saveDetalle(detalleId:string, detalle): Observable<any> {

        const detalleToSave = Object.assign({}, detalle);
        delete(detalleToSave.$key);

        let dataToSave = {};
        dataToSave[`detalles/${detalleId}`] = detalleToSave;

        return this.firebaseUpdate(dataToSave);


    }

    //Eliminar dueño (No funcional)
    deleteDetalle(detalleId:string): Observable<any> {

        const url = firebaseConfig.databaseURL + '/detalles/' + detalleId + '.json';

        return this.http.delete(url);
    }

    //No funcional
    requestDetalleDeletion(detalleId:string, perroId:string) {
        this.sdkDb.child('queue/tasks').push({detalleId,perroId})
            .then(
                () => alert('detalle deletion requested !')
            );
    }



}
