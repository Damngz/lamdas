const admin = require("firebase-admin");
const serviceAccount = require("./serviceAccount.json");
const { addTelemetryOnDB } = require("./utils");

/**
 * @param {Object} event - Evento de IoT Core que trae la información de la carga
*/

exports.lambdaHandler = async (event) => {
    
    initializeFirebaseApp(serviceAccount);

    // Base de datos
    const db = admin.firestore();
    
    // Funcion maneja todos los casos al agregar a BBDD
    const [status, info] = await addTelemetryOnDB(db, event);
    
    if (status === "OK") {
        console.info("Documento agregado correctamente con ID: ", info);
    } else {
        console.error(info);
    }
};

function initializeFirebaseApp(serviceAccount){
    // Para no inicializar dos veces la app de firebase
    if (admin.apps.length === 0) {        
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    }
}