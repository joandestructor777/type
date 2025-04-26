document.addEventListener('DOMContentLoaded', function() {
    // CREACION DE FUNCION PARA OBTENER DATA JSON
    const obtainQuotes = async () => {
        let response = await fetch('./data.json');
        let data = await response.json();
        quotes = data;
    }

    // CREACION Y LLAMADO DE ELEMENTOS DOM Y VARIABLES
    let quotes = [];
    let validas = [];
    let randomQuote = '';
    let spans = '';
    const section = document.querySelector('section');
    const quote = document.querySelector('.quote');
    const btn = document.querySelector('.btn-start');
    const input = document.querySelector('.input-quote');
    let minutos = 0;
    let horas = 0;
    let segundos = 0;
    let intervalo = null;
    let cronometro = document.querySelector('.cronometro');
    const btnRestart = document.querySelector('.restart');
    const bcgRestart = document.querySelector('.bcg-restart');
    const levelContainer = document.querySelector('.level');
    const facil = document.querySelector('.facil');
    const medio = document.querySelector('.medio');
    const dificil = document.querySelector('.dificil');
    let historial = document.querySelector('.historial');
    let inputNombre = document.querySelector('.level-input');
    let nombre = '';
    const botonSound = document.querySelector('.boton-sound');
    const closeTag = document.querySelector('.close-tag');
    const preloadSound = new Audio('./sonido1.mp3');
    preloadSound.load();

    inputNombre.addEventListener('input', function() {
        nombre = inputNombre.value;
    });
    inputNombre.addEventListener('keydown', (e) => {
        if (e.key.length === 1) {
            const keySound = new Audio('./sonido1.mp3');
            keySound.playbackRate = 1.2;
            keySound.volume = 0.5;       
            keySound.play();
        }
    });

    facil.addEventListener('click', async function() {
        if(inputNombre.value.length === 0){
            let existingErrorMessage = levelContainer.querySelector('.error-message');
            if (!existingErrorMessage) {
                let afterElement = levelContainer.children[2];
                let errorMessage = document.createElement('p');
                errorMessage.classList.add('error-message');  
                errorMessage.style.color = '#f00';
                errorMessage.style.fontSize = '2rem'
                errorMessage.textContent = 'Debes ingresar un nombre de usuario para continuar';
                levelContainer.insertBefore(errorMessage, afterElement);
            }
            return;
        }
        
        botonSound.currentTime = 0;
        botonSound.play();
        
        // Espera hasta que obtainQuotes() termine
        await obtainQuotes();
    
        console.log(quotes); 
        validas = quotes.filter(frase => frase.length >= 100 && frase.length <= 150);
    
        // Verificar si las frases válidas se han filtrado correctamente
        console.log(validas);  // Agregar esto para depuración
        
        // Ocultar la sección de selección de nivel
        levelContainer.style.display = 'none';
    });
    
    medio.addEventListener('click', async function() {
        if(inputNombre.value.length === 0){
            let existingErrorMessage = levelContainer.querySelector('.error-message');
            if (!existingErrorMessage) {
                let afterElement = levelContainer.children[2];
                let errorMessage = document.createElement('p');
                errorMessage.classList.add('error-message');  
                errorMessage.style.color = '#f00';
                errorMessage.style.fontSize = '2rem'
                errorMessage.textContent = 'Debes ingresar un nombre de usuario para continuar';
                levelContainer.insertBefore(errorMessage, afterElement);
            }
            return;
        }
        
        botonSound.currentTime = 0;
        botonSound.play();
        
        // Espera hasta que obtainQuotes() termine
        await obtainQuotes();
        
        // Verificar qué se obtiene del JSON
        console.log(quotes);  // Agregar esto para depuración
    
        // Filtra las frases válidas
        validas = quotes.filter(frase => frase.length >= 150 && frase.length <= 200);
    
        // Verificar si las frases válidas se han filtrado correctamente
        console.log(validas);  // Agregar esto para depuración
    
        // Ocultar la sección de selección de nivel
        levelContainer.style.display = 'none';
    });

    dificil.addEventListener('click', async function() {
        if(inputNombre.value.length === 0){
            let existingErrorMessage = levelContainer.querySelector('.error-message');
            if (!existingErrorMessage) {
                let afterElement = levelContainer.children[2];
                let errorMessage = document.createElement('p');
                errorMessage.classList.add('error-message');  
                errorMessage.style.color = '#f00';
                errorMessage.style.fontSize = '2rem'
                errorMessage.textContent = 'Debes ingresar un nombre de usuario para continuar';
                levelContainer.insertBefore(errorMessage, afterElement);
            }
            return;
        }
        botonSound.currentTime = 0;
        botonSound.play();
        await obtainQuotes();
        validas = quotes.filter(frase => frase.length >=300 && frase.length <= 350);
        console.log(validas)
        levelContainer.style.display = 'none';
    });

    // LOGICA AL HACER CLICK EN EL BOTÓN
    let table = document.querySelector('table tbody');
    let jugadores = JSON.parse(localStorage.getItem('jugadores')) || [];

    btn.addEventListener('click', async () => {
        botonSound.currentTime = 0;
        botonSound.play();
        let existe = jugadores.filter(j => j.nombre == nombre);

        if (existe.length > 0) {
      
          existe.forEach(jugador => {
              table.insertAdjacentHTML('beforeend',
                  `<tr class="tr-data">
                      <td class="td-data">${jugador.nombre}</td>
                      <td class="td-data">${jugador.wpm}</td>
                      <td class="td-data">${jugador.presicion}</td>
                      <td class="td-data">${jugador.erroneas}</td>
                      <td class="td-data">${jugador.tiempo}</td>
                      <td class="td-data">${jugador.fecha}</td>
                  </tr>`
              );
          });
      }

        segundos = 0;
        minutos = 0;
        horas = 0;
        btn.style.display = 'none';
        randomQuote = validas[Math.floor(Math.random() * validas.length)];
        spans = randomQuote.split("").map(char =>
            char === " " ? `<span>&nbsp;</span>` : `<span>${char}</span>`
        ).join("");
        quote.innerHTML = spans;
        input.value = "";
        input.focus();
    });

    // CRONOMETRO
    function conteo() {
        segundos++;
        if (segundos === 60) {
            segundos = 0;
            minutos++;
        }
        if (minutos === 60) {
            minutos = 0;
            horas++;
        }

        const formato =
            (horas < 10 ? '0' + horas : horas) + ":" +
            (minutos < 10 ? '0' + minutos : minutos) + ":" +
            (segundos < 10 ? '0' + segundos : segundos);
        cronometro.textContent = formato;
    }

    function iniciar() {
        if (!intervalo) {
            intervalo = setInterval(conteo, 1000);
        }
    }

    function detener() {
        if (intervalo) {
            clearInterval(intervalo);
            intervalo = null;
            window.scrollTo(0, 0);
            bcgRestart.style.display = 'flex';
            btnRestart.style.display = 'flex';
            document.body.style.overflow = 'hidden';
            const result = document.querySelector('.results-container');
            result.style.display = 'flex';
            result.style.animation = 'resultados 2s ease-in-out normal both';
            setTimeout(() => {
                cronometro.textContent = '00:00:00';
            }, 2000);
        }
    }

    // TIEMPO FORMATEADO
    function obtenerTiempo(horas, minutos, segundos) {
        if (horas === 0 && minutos === 0 && segundos !== 0) {
            return `Segundos: ${segundos}`;
        } else if (horas === 0 && minutos !== 0) {
            return `Minutos: ${minutos} <br> Segundos: ${segundos}`;
        } else {
            return `Horas: ${horas} <br> Minutos: ${minutos} <br> Segundos: ${segundos}`;
        }
    }

    // MANEJO DEL INPUT
    let acertadas = 0;
    let erroneas = 0;
    let spanAll;
    let fecha;
    let intento = 0;
    let wpm = 0;
    let presicion = 0;
    let porcentaje = 0;
    let tiempo = 0;

    input.addEventListener('blur', () => {
        setTimeout(() => {
            input.focus();
        }, 100);
    });
    input.addEventListener('keydown', (e) => {
        if (e.key.length === 1) {
            const keySound = new Audio('./sonido1.mp3');
            keySound.playbackRate = 1.2; 
            keySound.volume = 0.5;
            keySound.play();
        }
    });
    input.addEventListener('input', function() {

        let inputData = input.value;
        let lastChar = inputData.charAt(inputData.length - 1);
        spanAll = document.querySelectorAll('.quote span');

        if (inputData.length > 0) {
            iniciar();
            spanAll.forEach(s => {
                s.style.animation = "none";
                s.style.borderBottom = 'none';
            });

            if (spanAll[inputData.length]) {
                spanAll[inputData.length].style.animation = 'parpadeo 1.5s linear infinite normal both';
                spanAll[inputData.length].style.borderBottom = '2px solid #fff';
                spanAll[inputData.length].style.color = '#FFF';
            }

            if (spanAll[inputData.length - 1]) {
                if (lastChar === randomQuote[inputData.length - 1]) {
                    spanAll[inputData.length - 1].style.color = '#68e';
                    acertadas++;
                } else {
                    spanAll[inputData.length - 1].style.color = '#700';
                    erroneas++;
                }
            }
        }

        if (inputData.length === randomQuote.length) {
            input.disabled = true;
            setTimeout(async function() {
                await detener();
                intento++;
                section.style.animation = 'aparecer 1s linear 1 ease-in forwards';
                let resultList = document.querySelectorAll('.result p');
                let conversionMin = segundos / 60;
                wpm = ((acertadas / 4) / conversionMin).toFixed(1);
                resultList[0].textContent = `${wpm}`;
                tiempo = await obtenerTiempo(horas, minutos, segundos);
            
                spanAll.forEach(span => {
                    if (span.style.color === '#68e') acertadas++;
                    else if (span.style.color === '#700') erroneas++;
                });
            
                porcentaje = (acertadas / randomQuote.length) * 100;
                presicion = `${porcentaje.toFixed(1)}%`;
                porcentaje = porcentaje > 100 ? 100 : porcentaje;
                resultList[1].textContent = presicion;
                resultList[2].textContent = erroneas;
                resultList[3].innerHTML = tiempo;
            
                fecha = new Date().toLocaleString();
            
                // Insertar directamente la fila en la tabla después de completar la frase
                let tableHTML = `
                    <tr class="tr-data">
                        <td class="td-data">${nombre}</td>
                        <td class="td-data">${wpm}</td>
                        <td class="td-data">${presicion}</td>
                        <td class="td-data">${erroneas}</td>
                        <td class="td-data">${tiempo}</td>
                        <td class="td-data">${fecha}</td>
                    </tr>
                `;
                table.insertAdjacentHTML("beforeend", tableHTML);
            
                jugadores.push({
                    nombre,
                    wpm,
                    presicion,
                    erroneas,
                    tiempo,
                    fecha
                });
            
                localStorage.setItem('jugadores', JSON.stringify(jugadores));
            }, 2000);
        }
    });
    closeTag.addEventListener('click',()=>{
        historial.style.display = 'none';
        input.disabled = false;
        input.focus();
        
    })
    btnRestart.addEventListener('click', function() {
        botonSound.currentTime = 0;
        botonSound.play();
        bcgRestart.style.display = 'none';
        document.body.style.overflowY = 'visible';
        document.body.style.overflowX = 'hidden';
        historial.style.display = 'flex';
        historial.style.animation = "tabla 1s cubic-bezier(0.075, 0.82, 0.165, 1) 1 normal forwards";
        
    
        setTimeout(function() {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        }, 1000);
    
        segundos = 0;
        minutos = 0;
        horas = 0;
        erroneas = 0;
        acertadas = 0;
    
        spanAll.forEach(span => {
            span.style.color = '#fff';
        });
    
        input.value = '';
        input.focus();
    
        // Buscar si ya existe una fila para el jugador
        let existingRow = table.querySelector(`tr[data-nombre="${nombre}"]`);
    
        // Si existe, actualizamos la fila en vez de agregar una nueva
        if (existingRow) {
            existingRow.querySelector('.td-data:nth-child(2)').textContent = wpm;
            existingRow.querySelector('.td-data:nth-child(3)').textContent = presicion;
            existingRow.querySelector('.td-data:nth-child(4)').textContent = erroneas;
            existingRow.querySelector('.td-data:nth-child(5)').textContent = tiempo;
            existingRow.querySelector('.td-data:nth-child(6)').textContent = fecha;
        } else {
            // Si no existe, agregamos una nueva fila
            let tableHTML = `
                <tr class="tr-data" data-nombre="${nombre}">
                    <td class="td-data">${nombre}</td>
                    <td class="td-data">${wpm}</td>
                    <td class="td-data">${presicion}</td>
                    <td class="td-data">${erroneas}</td>
                    <td class="td-data">${tiempo}</td>
                    <td class="td-data">${fecha}</td>
                </tr>
            `;
            table.insertAdjacentHTML("beforeend", tableHTML);
        }
    
        jugadores.push({
            nombre,
            wpm,
            presicion,
            erroneas,
            tiempo,
            fecha
        });
        localStorage.setItem('jugadores', JSON.stringify(jugadores));
    });
      let tabPressed = false;
  document.addEventListener('keydown', (evt)=>{
      if(evt.code === 'ShiftLeft' || evt.code === 'ShiftRight'){
          tabPressed = true;
      }
      if(evt.code === 'KeyR' && tabPressed){
          evt.preventDefault()
          location.reload();
      }
  })
});

