import {
    obtenerNombres,
    obtenerDatos
} from './api.js';

const $contenedorPokemones = document.querySelector('.contenedor-pokemones');
const $contenedorPokemon = $contenedorPokemones.querySelectorAll('.contenedor-pokemon')
const $botonSiguiente = document.querySelector('#boton-siguiente');
const $botonAnterior = document.querySelector('#boton-anterior');

const $tituloModal = document.querySelector('#titulo-nombre-pokemon');
const $contenidoModal = document.querySelector('.modal-body');

const $fotoPokemonSeleccionado = $contenidoModal.querySelector('img');
const $pesoPokemonSeleccionado = $contenidoModal.querySelector('#peso-pokemon-seleccionado');
const $alturaPokemonSeleccionado = $contenidoModal.querySelector('#altura-pokemon-seleccionado');
const $tiposPokemonSeleccionado = $contenidoModal.querySelector('#tipo-pokemon-seleccionado');
const $habilidadPokemonSeleccionado = $contenidoModal.querySelector('#habilidad1-pokemon-seleccionado');

export async function mostrarNombres(paginaActual, callbackAPI){

    const respuestaAPI = await callbackAPI(paginaActual);
    
    $contenedorPokemon.forEach((element, index) => {
        element.innerText = respuestaAPI.results[index].name;
        element.dataset.nombre = respuestaAPI.results[index].name;
    });
};

export function manejarClick(callbackCargando, callbackUI){
    callbackCargando();
    $contenedorPokemones.onclick = function(e){
        let click = e.target;
        if (click.className === 'row'){
            return;
        }      
        let pokemonSeleccionado = click.getAttribute('data-nombre');
        click.setAttribute('data-target', '#info-pokemon');
        click.setAttribute('data-toggle', 'modal');

        callbackUI(pokemonSeleccionado, obtenerDatos);
    };
};

export async function mostrarDatos(nombre, callbackAPI){
    mostrarCartelCargandoDatos();
    const respuestaAPI = await callbackAPI(nombre)


    $tituloModal.innerText = nombre;
    $fotoPokemonSeleccionado.setAttribute('src', await respuestaAPI.sprites.front_default);
    $pesoPokemonSeleccionado.innerText = `Peso: ${(await respuestaAPI.weight*0.1).toFixed(2)} kg.`;
    $alturaPokemonSeleccionado.innerText = `Altura: ${(await respuestaAPI.height*0.1).toFixed(2)} m.`;
            
    if (respuestaAPI.types.length === 1){
        $tiposPokemonSeleccionado.innerText = `Tipo: ${await respuestaAPI.types[0].type.name}`;
    } else {
        $tiposPokemonSeleccionado.innerText = `Tipos: ${await respuestaAPI.types[0].type.name} y ${respuestaAPI.types[1].type.name}`;
    }
    
    if (respuestaAPI.abilities.length === 1){
        $habilidadPokemonSeleccionado.innerText = `Habilidades: ${await respuestaAPI.abilities[0].ability.name}`;
    } else {
        $habilidadPokemonSeleccionado.innerText = `Habilidades: ${await respuestaAPI.abilities[0].ability.name} y ${await respuestaAPI.abilities[1].ability.name}`;
    }
};

export function manejarBotones(paginaActual, callbackCargando, callbackUI){
    $botonAnterior.onclick = function(){
        callbackCargando();
        paginaActual--;
        if (paginaActual === 0){
           $botonAnterior.classList.add('ocultar');
        }
        callbackUI(paginaActual, obtenerNombres);
    };

    $botonSiguiente.onclick = function(){
        callbackCargando();
        paginaActual++;
        $botonAnterior.classList.remove('ocultar');
        callbackUI(paginaActual, obtenerNombres);
        };
};

export function mostrarCartelCargando(){
    $contenedorPokemon.forEach((element,index) => {
        element.innerText = 'Cargando...';
    });
};

export function mostrarCartelCargandoDatos(){
   $tituloModal.innerText = 'Cargando...';
   $fotoPokemonSeleccionado.setAttribute('src', '')
   $pesoPokemonSeleccionado.innerText = 'Cargando...';
   $alturaPokemonSeleccionado.innerText = 'Cargando...';
   $tiposPokemonSeleccionado.innerText = 'Cargando...';
   $habilidadPokemonSeleccionado.innerText = 'Cargando...';
};