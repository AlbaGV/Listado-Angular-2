


import {AuthMethods, AuthProviders} from "angularfire2";
//Datos de firebase
export const firebaseConfig = {
    apiKey: "AIzaSyDSSxRPOHnMH480Ao3q1wNy-yfsf5Y-OSg",
    authDomain: "final-project-prueba.firebaseapp.com",
    databaseURL: "https://final-project-prueba.firebaseio.com",
    storageBucket: "final-project-prueba.appspot.com",
    messagingSenderId: "832809293629"
};



export const authConfig = {
    provider: AuthProviders.Password,
    method: AuthMethods.Password
};
