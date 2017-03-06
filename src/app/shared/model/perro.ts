//POO de la tabla perro


import {Detalle} from "./detalle";
import {Observable} from "rxjs/Rx";




export class Perro {

    constructor(
        public $key:string,
        public url:string,
        public nombre:string) {

    }

    static fromJson({$key, url, nombre}) {
        return new Perro($key, url, nombre);
    }

    static fromJsonArray(json : any[]) : Perro[] {
        return json.map(Perro.fromJson);
    }


}
