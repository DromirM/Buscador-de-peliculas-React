
export const getStatusResult = (code = '') =>{
  const statusCode = code ? parseInt(code, 10) : null;

  switch (statusCode) {
    case 200:
      return { status: true, message: 'Datos obtenidos correctamente.' };
    case 201:
      return { status: true, message: 'Recurso creado correctamente.' };
    case 204:
      return { status: true, message: 'Solicitud exitosa, sin contenido.' };
    case 400:
      return { status: false, message: 'Solicitud incorrecta.' };
    case 401:
      return { status: false, message: 'No autorizado.' };
    case 403:
      return { status: false, message: 'Prohibido.' };
    case 404:
      return { status: false, message: 'No se encontraron datos.' };
    case 500:
      return { status: false, message: 'Error interno del servidor.' };
    case 502:
      return { status: false, message: 'Mala pasarela.' };
    case 503:
      return { status: false, message: 'Servicio no disponible.' };
    default:
      return { status: false, message: 'Error desconocido.' };
  }
}