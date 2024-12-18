console.log("Esto es el main.js cargado sin problemas");

/***********************************************
 * RELOJ EN TIEMPO REAL
 ***********************************************/

function actualizarHora() {
    const ahora = new Date();
    const horas = ahora.getHours().toString().padStart(2, '0');
    const minutos = ahora.getMinutes().toString().padStart(2, '0');
    const segundos = ahora.getSeconds().toString().padStart(2, '0');
    document.getElementById('hora').innerHTML = `<i class="fas fa-clock"></i> ${horas}:${minutos}:${segundos}`;
}

// Actualiza la hora cada segundo
setInterval(actualizarHora, 1000);

/***********************************************
 * CONFIGURACIÓN DEL REPRODUCTOR DE AUDIO
 ***********************************************/

window.onload = function () {
    const audioPlayer = document.getElementById('audio1');
    audioPlayer.style.setProperty('--media-controls-color', 'black');  // Botones negros
    audioPlayer.style.setProperty('--media-controls-background-color', 'yellow');  // Fondo amarillo
};

/***********************************************
 * OBTENER VINOS DESDE LA API
 ***********************************************/

document.addEventListener('DOMContentLoaded', function () {
    const vinosContainer = document.getElementById('vinos-container');

    fetch('https://lavinoteca.onrender.com/api/vinos')
        .then(response => response.ok ? response.json() : Promise.reject('Error en la red'))
        .then(vinos => mostrarVinos(vinos, vinosContainer))
        .catch(error => manejarError(vinosContainer, 'Error al cargar los vinos.'));
});

function mostrarVinos(vinos, container) {
    vinos.forEach(vino => {
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';
        card.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${vino.nombre}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${vino.bodega}</h6>
                    <p class="card-text"><strong>Cepa:</strong> ${vino.cepas.join(', ')}</p>
                    <p class="card-text"><strong>Partidas:</strong> ${vino.partidas.join(', ')}</p>
                </div>
            </div>`;
        container.appendChild(card);
    });
}

function manejarError(container, mensaje) {
    console.error(mensaje);
    container.innerHTML = `<p class="text-danger">${mensaje}</p>`;
}

/***********************************************
 * OBTENER BODEGAS DESDE LA API
 ***********************************************/

document.addEventListener('DOMContentLoaded', function () {
    const bodegasContainer = document.getElementById('bodegas-container');
    const domicilios = generarDomicilios();
        fetch('https://lavinoteca.onrender.com/api/bodegas')
        .then(response => response.ok ? response.json() : Promise.reject('Error en la red'))
        .then(bodegas => mostrarBodegas(bodegas, bodegasContainer, domicilios))
        .catch(error => manejarError(bodegasContainer, 'Error al cargar las bodegas.'));
});

function generarDomicilios() {
    return [
        "Av. Libertador 1234, Buenos Aires",
        "Ruta Nacional 40, San Juan",
        "Calle Falsa 742, Neuquén",
        "Calle del Vino 1357, Salta"
    ];
}

function mostrarBodegas(bodegas, container, domicilios) {
    bodegas.forEach((bodega, index) => {
        const domicilio = domicilios[index % domicilios.length];
        const card = document.createElement('div');
        card.className = 'col-md-4 mb-4';
        card.innerHTML = `
            <div class="card bodega-card">
                <div class="bodega-card-body p-2">
                    <h5 class="card-title">${bodega.nombre}</h5>
                    <p class="card-text"><strong>Número de Vinos:</strong> ${bodega.vinos}</p>
                    <p class="card-text"><strong>Domicilio:</strong> ${domicilio}</p>
                    <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(domicilio)}" target="_blank" class="btn btn-dark"><i class="fa-solid fa-map-location-dot"></i> Ver en Google Maps</a>
                </div>
            </div>`;
        container.appendChild(card);
    });
}

/***********************************************
 * EFECTO DE MÁQUINA DE ESCRIBIR
 ***********************************************/

function typeWriter(element, text, delay = 150) {
    let i = 0;
    (function write() {
        if (i < text.length) {
            element.textContent += text.charAt(i++);
            setTimeout(write, delay);
        } else {
            element.innerHTML += '<span class="cursor">|</span>';
        }
    })();
}

const h1 = document.getElementById('titulo');
const p = document.getElementById('texto');

h1.textContent = '';
p.textContent = '';

typeWriter(h1, 'Bienvenido a LaVinoteca', 150);
setTimeout(() => typeWriter(p, 'Explore la mejor selección de vinos.', 150), 1000);

/***********************************************
 * EFECTO DE LETRAS EN EL NEWLETTER
 ***********************************************/

function createRainEffect() {
    const letters = "mi@email.com";
    const rainContainer = document.getElementById("rain-container");
    
    setInterval(() => {
        const letter = document.createElement("span");
        letter.textContent = letters.charAt(Math.floor(Math.random() * letters.length));
        letter.className = "letter";
        letter.style.left = Math.random() * 100 + "vw"; // Posición horizontal aleatoria
        letter.style.animationDuration = (Math.random() * 1 + 2) + "s"; // Duración aleatoria

        rainContainer.appendChild(letter);

        // Remover la letra después de que cae
        setTimeout(() => {
            letter.remove();
        }, 5000); // Cambia el tiempo para que coincida con la duración de la animación
    }, 300); // Cambia el intervalo de tiempo entre letras
}

function createStarEffect() {
    const starContainer = document.getElementById("rain-container");
    const stars = "★☆"; // Caracteres de estrella

    setInterval(() => {
        const star = document.createElement("span");
        star.textContent = stars.charAt(Math.floor(Math.random() * stars.length));
        star.style.position = "absolute";
        star.style.left = Math.random() * 100 + "vw"; // Posición horizontal aleatoria
        star.style.top = Math.random() * 100 + "px"; // Posición vertical aleatoria
        star.style.color = "yellow"; // Color de la estrella
        star.style.fontSize = "20px"; // Tamaño de la estrella
        star.style.animation = `float linear ${Math.random() * 3 + 2}s`; // Duración aleatoria

        // Añadir estilos de animación
        star.style.animationName = "float";
        star.style.animationDuration = (Math.random() * 3 + 2) + "s";
        star.style.animationTimingFunction = "linear";

        starContainer.appendChild(star);

        // Añadir la animación mediante JS
        star.animate([
            { transform: 'translateY(0)' },
            { transform: 'translateY(-30px)' },
            { transform: 'translateY(0)' }
        ], {
            duration: Math.random() * 3000 + 2000, // Duración aleatoria
            iterations: Infinity // Repetir infinitamente
        });

        // Remover la estrella después de un tiempo
        setTimeout(() => {
            star.remove();
        }, 5000); // Remover después de un tiempo
    }, 2500); // Cambia el intervalo de tiempo entre estrellas
}

createRainEffect();

// /***********************************************
//  * VALIDACIÓN DEL FORMULARIO
// ***********************************************

document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('FormContacto');
    const inputs = form.querySelectorAll('input, textarea');

    inputs.forEach(input => input.addEventListener('input', () => validarCampo(input)));
    form.addEventListener('submit', validarFormulario);
});

// Lista de provincias válidas
const provinciasValidas = [
    "Buenos Aires", "Catamarca", "Chaco", "Chubut", "Córdoba",
    "Corrientes", "Entre Ríos", "Formosa", "Jujuy", "La Pampa",
    "La Rioja", "Mendoza", "Misiones", "Neuquén", "Río Negro",
    "Salta", "San Juan", "San Luis", "Santa Cruz", "Santa Fe",
    "Santiago del Estero", "Tierra del Fuego", "Tucumán"
];

// Validación de cada campo
function validarCampo(campo) {
    const valor = campo.value.trim();

    // Validaciones por ID
    let esValido = false;
    switch (campo.id) {
        case 'nombre':
        case 'apellido':
            esValido = /^[A-Z][a-zA-Z\s]{2,}$/.test(valor); // Mayúscula inicial y al menos 2 caracteres
            break;
        case 'provincia':
            esValido = provinciasValidas.includes(valor); // Validación de provincias
            break;
        case 'whatsapp':
            esValido = /^54\s9\s\d{3}\s\d{3}\s\d{4}$/.test(valor); // Formato de WhatsApp: 54 9 341 620 0000
            break;
        case 'email':
            esValido = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(valor); // Formato de email
            break;
        case 'consulta':
            esValido = /^[A-Z].{19,}$/.test(valor); // Inicia con mayúscula y mínimo 20 caracteres
            break;
        case 'localidad':
            esValido = /^[A-Z].{2,}$/.test(valor); // Inicia con mayúscula y mínimo 3 caracteres
            break;
        default:
            esValido = campo.checkValidity(); // Otras validaciones predeterminadas
            break;
    }

    marcarEstado(campo, esValido);
}

// Validación del formulario al enviar
function validarFormulario(event) {
    event.preventDefault(); // Previene el envío por defecto
    const form = event.target;
    let esValido = true;

    // Validar todos los campos
    form.querySelectorAll('input, textarea').forEach(input => {
        validarCampo(input);
        if (!input.classList.contains('is-valid')) esValido = false; // Si hay un campo no válido
    });

    // Si todos los campos son válidos, enviar formulario
    if (esValido) {
        enviarFormulario(form);
    } else {
        form.classList.add('was-validated'); // Muestra los errores de validación
    }
}

// Marcar el estado de cada campo
function marcarEstado(campo, esValido) {
    campo.classList.toggle('is-valid', esValido);
    campo.classList.toggle('is-invalid', !esValido);
}


// /***********************************************
//  * ENVÍO ASINCRÓNICO DEL FORMULARIO
//  ***********************************************/

document.addEventListener('DOMContentLoaded', () => {
    const formulario = document.getElementById('FormContacto');
    const respuestaElemento = document.getElementById('respuestaServerFormulario');

    formulario.addEventListener('submit', async (event) => {
        event.preventDefault(); // Detiene el envío del formulario

        // Verificamos la validación antes de proceder
        let esValido = true;
        const inputs = formulario.querySelectorAll('input, textarea');

        inputs.forEach(input => {
            validarCampo(input); // Revalidamos cada campo
            if (!input.classList.contains('is-valid')) {
                esValido = false;
            }
        });

        if (!esValido) {
            mostrarErrores(); // Muestra errores si no es válido
            return; // Detiene el envío
        }

        try {
            const formData = new FormData(formulario);
            const response = await fetch('/enviar-formulario', {
                method: 'POST',
                body: formData
            });

            if (!response.ok) {
                const errorMessage = await response.text(); // obtener mensaje de error
                throw new Error(errorMessage);
            }

            const data = await response.text();
            mostrarRespuesta(
                `<i class="fa-regular fa-envelope-circle-check"></i> ${data}`, 
                'success'
            );
        } catch (error) {
            mostrarRespuesta(
                `<i class='fa-solid fa-circle-exclamation'></i> ${error.message}`, 
                'error'
            );
        }
    });

    function mostrarErrores() {
        const errores = document.createElement('div');
        errores.className = 'alert alert-danger';
        errores.innerHTML = '<strong>Error:</strong> No se pueden enviar los datos. Por favor, corrige los campos marcados.';
        document.body.prepend(errores);
        setTimeout(() => {
            errores.remove();
        }, 5000);
    }

    function mostrarRespuesta(mensaje, tipo) {
        if (!respuestaElemento) {
            console.error("No se encontró el elemento con ID 'respuestaServerFormulario'.");
            return;
        }

        respuestaElemento.className = tipo === 'success' ? 'alert alert-success' : 'alert alert-danger';
        respuestaElemento.innerHTML = mensaje; // Permite insertar HTML

        // Muestra la respuesta y la oculta después de 5 segundos
        respuestaElemento.style.display = 'block';
        setTimeout(() => {
            respuestaElemento.style.display = 'none';
        }, 5000);
    }
});

/***********************************************
 * MODAL DE INSCRIPCIÓN A UN EVENTO
 ***********************************************/

//Abrir, Cerrar y Enviar el Formulario de inscripción a eventos online con Fetch
document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modalInscripcion");
    const closeButton = document.querySelector(".close-button");

    // Manejar el clic en el botón "Inscribirme"
    document.querySelectorAll(".btn-inscribirme").forEach(button => {
        button.addEventListener("click", function () {
            const eventoId = this.getAttribute("data-evento-id");
            document.getElementById("evento_id").value = eventoId;
            modal.style.display = "block"; // Mostrar el modal
        });
    });

    // Cerrar el modal
    closeButton.addEventListener("click", function () {
        modal.style.display = "none";
    });

    // Manejar el envío del formulario de inscripción
    document.getElementById("formInscripcion").addEventListener("submit", function (event) {
        event.preventDefault(); // Evitar la recarga de la página

        const formData = new FormData(this);
        fetch("/inscribir_evento", {
            method: "POST",
            body: formData,
        })
        .then(response => response.text()) // Cambiar a .text() si la respuesta no es JSON
        .then(data => {
            // Actualizar la tabla de eventos
            document.getElementById("tabla-eventos").innerHTML = data;
            modal.style.display = "none"; // Cerrar el modal
        })
        .catch(error => console.error("Error:", error));
    });
});

// Dentro del script de inscripción
$('#formInscripcion').on('submit', function(e) {
    e.preventDefault(); // Evitar el envío normal del formulario
    $.ajax({
        type: 'POST',
        url: '/inscribir_evento',
        data: $(this).serialize(),
        success: function(response) {
            // Actualizar la tabla de eventos
            $('#tablaEventos').html(response); // Suponiendo que la tabla tiene un ID 'tablaEventos'
            $('#modalInscripcion').hide(); // Cerrar el modal
        },
        error: function(error) {
            alert('Error al inscribir asistente: ' + error.responseText);
        }
    });
});