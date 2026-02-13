const canvas = document.getElementById('laberinto');
const ctx = canvas.getContext('2d');
const tamañoCelda = 25;
const numFilas = 20;
const numColumnas = 20;

const niveles = [
    [
        [0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0],
        [1, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
        [0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1],
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
        [0, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1],
        [0, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
        [0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 0, 0, 1, 0, 1],
        [1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1],
        [0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 0, 0, 1],
        [0, 1, 0, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 1, 0, 1, 0, 1, 1, 0],
        [0, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 0, 1, 0, 1, 0, 0],
        [0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 1, 0, 1],
        [0, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
        [0, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 1],
        [0, 0, 0, 1, 1, 1, 0, 1, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 1],
        [1, 1, 0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 0, 0],
        [1, 0, 0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 0, 0, 0, 1, 0, 0],
        [1, 0, 1, 1, 1, 1, 0, 1, 1, 0, 1, 0, 0, 1, 1, 1, 0, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 1, 0, 1, 1, 1, 0, 0, 1, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0, 0]
    ],
    [
        [0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 1, 1, 0],
        [0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
        [1, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 1, 1],
        [1, 0, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1],
        [0, 0, 1, 1, 0, 1, 1, 0, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
        [0, 1, 1, 1, 0, 1, 1, 0, 1, 0, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 0],
        [0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1, 1, 1, 0, 1, 1, 0, 0],
        [0, 1, 1, 1, 0, 1, 1, 0, 1, 1, 0, 0, 1, 0, 0, 0, 1, 1, 0, 1],
        [0, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 1],
        [0, 1, 0, 1, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 1, 1, 1, 0, 0, 1],
        [0, 1, 1, 1, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 1, 0, 0, 0],
        [0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0],
        [0, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
        [0, 1, 1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1, 0, 1, 1, 1, 1],
        [0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 1, 0, 0, 0, 0, 0],
        [0, 1, 0, 0, 1, 1, 0, 1, 0, 1, 0, 0, 1, 0, 1, 1, 1, 1, 1, 0],
        [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0, 0, 0, 1, 1],
        [1, 1, 0, 1, 1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 0, 1, 0, 0, 0]
    ]
];

let nivelActual = 0;
let laberinto = niveles[nivelActual];

const imagenPared = new Image();
imagenPared.src = "assets/piedra.jpg";

const imagenTierra = new Image();
imagenTierra.src = "assets/tierra.png";

const imagenJugadorRight = new Image();
imagenJugadorRight.src = "assets/player-right.png";

const imagenJugadorLeft = new Image();
imagenJugadorLeft.src = "assets/player-left.png";

const imagenObjetivo = new Image();
imagenObjetivo.src = "assets/meta.png";

const jugador = {
    x: 10,
    y: 9,
    direccion: 'right'
}

const objetivo = {
    x: 19,
    y: 19
}

function dibujarLaberinto() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let fila = 0; fila < numFilas; fila++) {
        for (let columna = 0; columna < numColumnas; columna++) {
            if (laberinto[fila][columna] === 1) {
                ctx.drawImage(imagenPared, columna * tamañoCelda, fila * tamañoCelda, tamañoCelda, tamañoCelda);
            } else {
                ctx.drawImage(imagenTierra, columna * tamañoCelda, fila * tamañoCelda, tamañoCelda, tamañoCelda);
            }

            
            
        }
    }

    if (jugador.direccion === 'right') {
        ctx.drawImage(imagenJugadorRight, jugador.x * tamañoCelda, jugador.y * tamañoCelda, tamañoCelda, tamañoCelda);
    } else {
        ctx.drawImage(imagenJugadorLeft, jugador.x * tamañoCelda, jugador.y * tamañoCelda, tamañoCelda, tamañoCelda);
    }
    ctx.drawImage(imagenObjetivo, objetivo.x * tamañoCelda, objetivo.y * tamañoCelda, tamañoCelda, tamañoCelda);
}

function mostrarMenuInicio() {
    canvas.style.display = 'none';

    const menuContainer = document.createElement('div');
    menuContainer.classList.add('menu-inicio');

    const titulo = document.createElement('h1');
    titulo.textContent = 'Bienvenido al Laberinto';
    titulo.classList.add('titulo-inicio');

    const texto = document.createElement('p');
    texto.textContent = 'Controles: Muevete con las flechas del teclado.';
    texto.classList.add('texto-inicio');

    const botonInicio = document.createElement('button');
    botonInicio.textContent = 'Iniciar';
    botonInicio.classList.add('boton-inicio');
    botonInicio.addEventListener('click', () => {
        document.body.removeChild(menuContainer);
        canvas.style.display = 'block';
        dibujarLaberinto();
    });

    menuContainer.appendChild(titulo);
    menuContainer.appendChild(texto);
    menuContainer.appendChild(botonInicio);
    document.body.appendChild(menuContainer);
}

function moverJugador(event) {
    const teclas = {
        'ArrowUp': [-1, 0],
        'ArrowDown': [1, 0],
        'ArrowLeft': [0, -1],
        'ArrowRight': [0, 1]
    };

    const movimiento = teclas[event.key];
    if (movimiento) {
        const nuevaPosicion = { 
            x: jugador.x + movimiento[1], 
            y: jugador.y + movimiento[0] 
        };

        if (esMovimientoValido(nuevaPosicion.x, nuevaPosicion.y)) {
            jugador.x = nuevaPosicion.x;
            jugador.y = nuevaPosicion.y;

            if (event.key === 'ArrowRight') jugador.direccion = 'right';
            if (event.key === 'ArrowLeft') jugador.direccion = 'left';
        }

        if (jugador.x === objetivo.x && jugador.y === objetivo.y) {
            mostrarBotonSiguienteNivel();
        }

        dibujarLaberinto();
    }
}


function esMovimientoValido(x, y) {
    return x >= 0 && x < numColumnas &&
           y >= 0 && y < numFilas &&
           laberinto[y][x] === 0;
}

function mostrarBotonSiguienteNivel() {
    const botonSiguienteNivel = document.createElement('button');
    botonSiguienteNivel.textContent = 'Siguiente nivel';
    botonSiguienteNivel.classList.add('boton-siguiente-nivel');
    botonSiguienteNivel.addEventListener('click', siguienteNivel);
    document.body.appendChild(botonSiguienteNivel);
}

function siguienteNivel() {
    nivelActual++;
    if (nivelActual < niveles.length) {
        laberinto = niveles[nivelActual];
        jugador.x = 10;
        jugador.y = 9;
        objetivo.x = 19;
        objetivo.y = 19;
        dibujarLaberinto();
        document.body.removeChild(document.querySelector('button'));
    } else {
        mostrarGifVictoria(); 
    }
}

function mostrarGifVictoria() {
    const botonExistente = document.querySelector('button');
    if (botonExistente) {
        document.body.removeChild(botonExistente);
    }

    canvas.style.display = 'none';

    const endText = document.createElement('h1');
    endText.textContent = 'Felicidades! has completado el laberinto';
    endText.classList.add('endText');
    
    const gifContainer = document.createElement('div');
    gifContainer.classList.add('gifDiv');

    const gif = document.createElement('img');
    gif.src = 'https://media.tenor.com/C0mP_I660_0AAAAi/cat-dance.gif';
    gif.style.width = '400px';
    gif.style.height = 'auto';
    
    const botonReinicio = document.createElement('button');
    botonReinicio.textContent = 'Reiniciar Juego';
    botonReinicio.classList.add('boton-reinicio');
    botonReinicio.addEventListener('click', reiniciarJuego);

    gifContainer.appendChild(endText);
    gifContainer.appendChild(gif);
    gifContainer.appendChild(botonReinicio);
    document.body.appendChild(gifContainer);
}

function reiniciarJuego() {
    const gifContainer = document.querySelector('div');
    if (gifContainer) document.body.removeChild(gifContainer);
    
    nivelActual = 0;
    laberinto = niveles[nivelActual];
    jugador.x = 10;
    jugador.y = 9;
    objetivo.x = 19;
    objetivo.y = 19;
    
    canvas.style.display = 'block';
    dibujarLaberinto();
}

document.addEventListener('keydown', moverJugador);
window.onload = mostrarMenuInicio;
imagenPared.onload = dibujarLaberinto;
imagenTierra.onload = dibujarLaberinto;
imagenObjetivo.onload = dibujarLaberinto;