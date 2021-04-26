import {
    obtenerNombres,
    obtenerDatos
} from './api.js';

import {
    mostrarNombres,
    manejarClick,
    mostrarDatos,
    manejarBotones
} from './ui.js';

let paginaActual;

async function cargarInicio(){
    paginaActual = 0;
    await mostrarNombres(paginaActual, obtenerNombres);
    manejarClick(mostrarDatos)
    manejarBotones(paginaActual, mostrarNombres);
};

cargarInicio();
