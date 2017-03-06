import {database, initializeApp} from "firebase";
import {firebaseConfig} from "./src/environments/firebase.config";
import {dbData} from "./db-data";


console.log('Initizalizing Firebase database ... ');

initializeApp(firebaseConfig);


const perroRef = database().ref('perro');
const detallesRef = database().ref('detalles');


//funciones para ingresar detalles en la base de datos

dbData.perro.forEach( perro => {

  console.log('adding perro', perro.url);

  const perroRef = perrosRef.push({
      url: perro.url,
      nombre: perro.nombre
  });

  let detalleKeysPerPerro = [];

  perro.detalles.forEach((detalle:any) =>  {

    console.log('adding detalle ', detalle.url);

    detalleKeysPerPerro.push(detallesRef.push({
        dueno: detalle.dueno,

        url: lesson.url,

        perroId: perroRef.key
      }).key);

  });

 //funciones para asociar los nuevo detalles a la tabla perro
 
  const association = database().ref('detallesporperro');

  const detallesporperro = association.child(perroRef.key);

  detalleKeysPerPerro.forEach(detalleKey => {
    console.log('adding detalle to perro ');

    const detallePerroAssociation = detallesporperro.child(detalleKey);

    detallePerroAssociation.set(true);
  });


});
