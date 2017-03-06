//POO del programa


export class Detalle {


    constructor(
        public $key:string,
        public dueno: string,
        public perroId:string,
        public url: string) {

    }


    //get isBeginner() {
      //  return this.tags && this.tags.includes('BEGINNER');
    //}


    static fromJsonList(array): Detalle[] {
        return array.map(Detalle.fromJson);
    }

    static fromJson({$key, dueno, url,perroId}):Detalle {
        return new Detalle(
            $key,
            dueno,
            url,
            perroId);
    }


}
