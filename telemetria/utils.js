exports.addTelemetryOnDB = async function (db, event) {
    const { topico, timestamp, ...paquete_datos } = event;
    
    // Setamos los datos a guardar en la BD
    const data = {
        topico: topico,
        timestamp: timestamp,
        paquete_datos: paquete_datos,
        ...paquete_datos
    };
    
    // A usar en el futuro
    // const { topico, ...data} = event;
  
    try {
      // Si todo anda bien devolvemos un OK y el ID del documento guardado
      const response = await db.collection("telemetria")
      .add(data);
  
      return ["OK", response.id];
  
    } catch (error) {
      // Si obtenemos un error devolvemos NOT OK y el error
      return ["NOT-OK", error];
    }
};