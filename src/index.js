import {
    obtenerNombres,
    obtenerDatos
} from './api.js';

import {
    mostrarNombres,
    manejarClick,
    mostrarDatos,
    manejarBotones,
    mostrarCartelCargando,
    mostrarCartelCargandoDatos
} from './ui.js';

let paginaActual;

async function cargarInicio(){
    mostrarCartelCargando();
    paginaActual = 0;
    await mostrarNombres(paginaActual, obtenerNombres);
    manejarClick(mostrarCartelCargandoDatos, obtenerDatos, mostrarDatos);
    manejarBotones(paginaActual, mostrarCartelCargando, obtenerNombres, mostrarNombres);
};

cargarInicio();
