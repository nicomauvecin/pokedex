const API_URL = 'https://pokeapi.co/api/v2/';
const $contenedorPokemon = document.querySelector('.contenedor-pokemon');
const $nombresPokemon = document.querySelectorAll('.nombre-pokemon');
const $fotosPokemon = document.querySelectorAll('.foto-pokemon');
const $cargando = document.querySelector('.cargando');
const $botonSiguiente = document.querySelector('#boton-siguiente');
const $botonAnterior = document.querySelector('#boton-anterior');
let imagen;
let paginaActual = 0;
let contadorNombres = paginaActual * 20;

function cargarInicio(){
    cargarNombres(contadorNombres);    
    cargarImagenes(paginaActual);
};

function cargarNombres(contadorNombres){
    fetch(`${API_URL}pokemon/?limit=20&offset=${contadorNombres}`)
        .then(respuesta => respuesta.json())
        .then(respuestaJSON => {
            $nombresPokemon.forEach(function(nombre,index){
                $nombresPokemon[index].innerText = `${respuestaJSON.results[index].name}`
            });
        });
};

function cargarImagenes(paginaActual){
    $fotosPokemon.forEach(function(foto, index){
        fetch(`${API_URL}pokemon/${(index+1)+(20*(paginaActual))}`)
        .then(respuesta => respuesta.json())
        .then(respuestaJSON =>{
            modificarImagenes(respuestaJSON, index);
        });
    })
    $cargando.classList.add('ocultar');
};

function modificarImagenes(respuestaJSON, index){
    $fotosPokemon[index].setAttribute('src', `${respuestaJSON.sprites.front_default}`);
    return;
}

$botonSiguiente.onclick = function(){
    $cargando.classList.remove('ocultar');
    $botonAnterior.classList.remove('ocultar');
    paginaActual++;
    contadorNombres = paginaActual * 20;
    cargarNombres(contadorNombres);
    cargarImagenes(paginaActual);
    return;
};

$botonAnterior.onclick = function(){
    $cargando.classList.remove('ocultar');
        paginaActual--;
        contadorNombres = paginaActual * 20;
        cargarNombres(contadorNombres);
        cargarImagenes(paginaActual);
        if (paginaActual === 0){
            $botonAnterior.classList.add('ocultar');
        }
        return;      
};

cargarInicio();
