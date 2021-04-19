const API_URL = 'https://pokeapi.co/api/v2/';
const $contenedorPokemon = document.querySelector('.contenedor-pokemon');
const $nombresPokemon = document.querySelectorAll('.nombre-pokemon');
const $fotosPokemon = document.querySelectorAll('.foto-pokemon');
const $cargando = document.querySelector('.cargando');
const $botonSiguiente = document.querySelector('#boton-siguiente');
const $botonAnterior = document.querySelector('#boton-anterior');
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

const $tituloModal = document.querySelector('#titulo-nombre-pokemon');
const $contenidoModal = document.querySelector('.modal-body');

$contenedorPokemon.onclick = function(e){
    let pokemonSeleccionado = e.target;
    if (pokemonSeleccionado.className === 'foto-pokemon' || pokemonSeleccionado.className === 'nombre-pokemon'){
        pokemonSeleccionado = e.target.parentNode;
    } 
    if (pokemonSeleccionado.className === 'row'){
        return;
    }
    pokemonSeleccionado.setAttribute('data-target', '#info-pokemon');
    pokemonSeleccionado.setAttribute('data-toggle', 'modal');

    const $nombrePokemonSeleccionado = pokemonSeleccionado.querySelector('.nombre-pokemon').innerText;
    const URL_fotoPokemonSeleccionado = pokemonSeleccionado.querySelector('img').getAttribute('src');

    const $fotoPokemonSeleccionado = $contenidoModal.querySelector('img');
    const $pesoPokemonSeleccionado = $contenidoModal.querySelector('#peso-pokemon-seleccionado');
    const $alturaPokemonSeleccionado = $contenidoModal.querySelector('#altura-pokemon-seleccionado');
    const $tiposPokemonSeleccionado = $contenidoModal.querySelector('#tipo-pokemon-seleccionado');
    const $habilidadPokemonSeleccionado = $contenidoModal.querySelector('#habilidad1-pokemon-seleccionado');
    
    function cargarDatos(){
        $tituloModal.innerText = `${$nombrePokemonSeleccionado}`;
        $fotoPokemonSeleccionado.setAttribute('src', `${URL_fotoPokemonSeleccionado}`)

        fetch(`${API_URL}pokemon/${$nombrePokemonSeleccionado}`)
        .then(respuesta => respuesta.json())
        .then(respuestaJSON =>{
            $pesoPokemonSeleccionado.innerText = `Peso: ${(respuestaJSON.weight*0.1).toFixed(2)} kg.`
            $alturaPokemonSeleccionado.innerText = `Altura: ${(respuestaJSON.height*0.1).toFixed(2)} m.`
            
            if (respuestaJSON.types.length === 1){
                $tiposPokemonSeleccionado.innerText = `Tipo: ${respuestaJSON.types[0].type.name}`
            } else {
                $tiposPokemonSeleccionado.innerText = `Tipos: ${respuestaJSON.types[0].type.name} y ${respuestaJSON.types[1].type.name}`
            }

            if (respuestaJSON.abilities.length === 1){
                $habilidadPokemonSeleccionado.innerText = `Habilidades: ${respuestaJSON.abilities[0].ability.name}`
            } else {
                $habilidadPokemonSeleccionado.innerText = `Habilidades: ${respuestaJSON.abilities[0].ability.name} y ${respuestaJSON.abilities[1].ability.name}`
            }
        });

       }
    cargarDatos();
}

cargarInicio();
