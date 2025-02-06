const canvas = document.getElementById('laberinto');
const ctx = canvas.getContext('2d');
const tamañoCelda = 40;
const numFilas = 10;
const numColumnas = 10;

const niveles = [
    [
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 1, 1, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 1, 1, 1, 1],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
    ],
    [
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 0, 1, 0, 1, 1, 1, 0, 1],
        [1, 0, 0, 1, 0, 1, 0, 0, 1, 1],
        [1, 0, 1, 1, 0, 1, 0, 1, 1, 1],
        [1, 0, 1, 1, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 1, 1, 0, 0, 0, 1],
        [1, 1, 1, 1, 0, 1, 1, 1, 0, 1],
        [1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
    ],
    [
        [0, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [0, 0, 0, 0, 0, 1, 0, 1, 0, 1],
        [1, 1, 1, 1, 0, 1, 0, 1, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 0, 1, 1, 0, 1, 0, 1, 1, 1],
        [1, 0, 0, 0, 0, 1, 0, 0, 0, 1],
        [1, 0, 1, 1, 1, 1, 1, 1, 0, 1],
        [1, 1, 0, 0, 0, 0, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 0, 1, 0, 1],
        [1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    ]
];

let nivelActual = 0;
let laberinto = niveles[nivelActual];

const jugador = {
    x: 0,
    y: 0
};

const objetivo = {
    x: 9,
    y: 9
};

function dibujarLaberinto() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    for (let fila = 0; fila < numFilas; fila++) {
        for (let columna = 0; columna < numColumnas; columna++) {
            ctx.fillStyle = laberinto[fila][columna] === 1 ? '#000000' : '#ffffff';
            ctx.fillRect(columna * tamañoCelda, fila * tamañoCelda, tamañoCelda, tamañoCelda);
            ctx.strokeStyle = '#cccccc';
            ctx.strokeRect(columna * tamañoCelda, fila * tamañoCelda, tamañoCelda, tamañoCelda);
        }
    }

    ctx.fillStyle = 'blue';
    ctx.fillRect(jugador.x * tamañoCelda, jugador.y * tamañoCelda, tamañoCelda, tamañoCelda);

    ctx.fillStyle = 'red';
    ctx.fillRect(objetivo.x * tamañoCelda, objetivo.y * tamañoCelda, tamañoCelda, tamañoCelda);
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

        if (
            nuevaPosicion.x >= 0 && nuevaPosicion.x < numColumnas &&
            nuevaPosicion.y >= 0 && nuevaPosicion.y < numFilas &&
            laberinto[nuevaPosicion.y][nuevaPosicion.x] === 0
        ) {
            jugador.x = nuevaPosicion.x;
            jugador.y = nuevaPosicion.y;
        }

        if (jugador.x === objetivo.x && jugador.y === objetivo.y) {
            mostrarBotonSiguienteNivel();
        }

        dibujarLaberinto();
    }
}

function mostrarBotonSiguienteNivel() {
    const botonSiguienteNivel = document.createElement('button');
    botonSiguienteNivel.textContent = 'Siguiente nivel';
    botonSiguienteNivel.style.position = 'absolute';
    botonSiguienteNivel.style.top = '50%';
    botonSiguienteNivel.style.left = '50%';
    botonSiguienteNivel.style.transform = 'translate(-50%, -50%)';
    botonSiguienteNivel.style.padding = '10px 20px';
    botonSiguienteNivel.style.fontSize = '20px';
    botonSiguienteNivel.style.cursor = 'pointer';
    botonSiguienteNivel.addEventListener('click', siguienteNivel);
    document.body.appendChild(botonSiguienteNivel);
}

function siguienteNivel() {
    nivelActual++;
    if (nivelActual < niveles.length) {
        laberinto = niveles[nivelActual];
        jugador.x = 0;
        jugador.y = 0;
        objetivo.x = 9;
        objetivo.y = 9;
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
    
    const gifContainer = document.createElement('div');
    gifContainer.style.position = 'fixed';
    gifContainer.style.top = '50%';
    gifContainer.style.left = '50%';
    gifContainer.style.transform = 'translate(-50%, -50%)';
    gifContainer.style.textAlign = 'center';

    const gif = document.createElement('img');
    gif.src = 'https://media.tenor.com/C0mP_I660_0AAAAi/cat-dance.gif';
    gif.style.width = '400px';
    gif.style.height = 'auto';
    
    const botonReinicio = document.createElement('button');
    botonReinicio.textContent = 'Reiniciar Juego';
    botonReinicio.style.display = 'block';
    botonReinicio.style.margin = '20px auto';
    botonReinicio.style.padding = '15px 30px';
    botonReinicio.style.fontSize = '18px';
    botonReinicio.addEventListener('click', reiniciarJuego);

    gifContainer.appendChild(gif);
    gifContainer.appendChild(botonReinicio);
    document.body.appendChild(gifContainer);
}

function reiniciarJuego() {
    const gifContainer = document.querySelector('div');
    if (gifContainer) document.body.removeChild(gifContainer);
    
    nivelActual = 0;
    laberinto = niveles[nivelActual];
    jugador.x = 0;
    jugador.y = 0;
    objetivo.x = 9;
    objetivo.y = 9;
    
    canvas.style.display = 'block';
    dibujarLaberinto();
}

document.addEventListener('keydown', moverJugador);
dibujarLaberinto();