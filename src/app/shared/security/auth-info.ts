
//Seguimiento de la id de usuario

export class AuthInfo {

    constructor(
        public $uid:string
    ) {

    }


    isLoggedIn() {
        return !!this.$uid;
    }

}
