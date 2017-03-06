
import {firebaseConfig} from "./src/environments/firebase.config";
import {initializeApp, auth,database} from 'firebase';
var Queue = require('firebase-queue');


console.log('Running batch server ...');

initializeApp(firebaseConfig);

auth()
    .signInWithEmailAndPassword('admin@angular-university.io', 'test123')
    .then(runConsumer)
    .catch(onError);

function onError(err) {
    console.error("Could not login", err);
    process.exit();
}

//Procesos de cola para la base de datos para eliminacion (No usuado al final)
function runConsumer() {

    console.log("Running consumer ...");

    const detallesRef = database().ref("detalles");
    const detallesporperroRef = database().ref("detallesporperro");

    const queueRef = database().ref('queue');


    const queue = new Queue(queueRef, function(data, progress, resolve, reject) {

        console.log('received delete request ...',data);

        const deleteDetallePromise = detallesRef.child(data.detalleId).remove();

        const deletedetallesporperroPromise =
            detallesporperroRef.child(`${data.perroId}/${data.detalleId}`).remove();

        Promise.all([deleteDetallePromise, deletedetallesporperroPromise])
            .then(
                () => {
                    console.log("detalle eliminado");
                    resolve();
                }
            )
            .catch(() => {
            console.log("problema al eliminar detalle");
            reject();
        });


    });


}
