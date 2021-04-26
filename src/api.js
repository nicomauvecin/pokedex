const API_URL = 'https://pokeapi.co/api/v2/';
export async function obtenerNombres(paginaActual){
    const respuesta = await fetch(`${API_URL}pokemon/?limit=20&offset=${paginaActual*20}`)
    const respuestaJSON = respuesta.json();
    return respuestaJSON;
};

export async function obtenerDatos(nombre){
    const respuesta = await fetch(`${API_URL}pokemon/${nombre}`);
    const respuestaJSON = respuesta.json();
    return respuestaJSON;
};