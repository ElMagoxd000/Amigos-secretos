var grid = document.querySelector("#grid"),
    overlay = document.querySelector("#overlay"),
	usuario = document.querySelector("#usuario"),
	persona = document.querySelector("#persona"),
	popup = document.querySelector("#popup"),
	btn = document.querySelector("#btn"),
	nombre_jugador = "";

var cargar = () => {
    var tarjetas = document.getElementsByClassName("tarjeta"),
	   tarjetasDisponibles = document.querySelectorAll(".si");

    for (var i = 0; i < tarjetas.length; i++)
    {
        let hei = window.getComputedStyle(tarjetas[i], null).getPropertyValue("width");
        tarjetas[i].style.height = hei;
        	// console.log(tarjetas[i]);
    }
    tarjetasDisponibles.forEach((elemento) => {
        elemento.addEventListener("click", (event) => {
        	// console.log(event.target.parentNode);
        	event.target.parentNode.classList.add("activo");
        	persona.innerText = event.target.parentNode.children[1].innerText;
        	overlay.classList.add("activo");
            // alert(persona.innerText);
            elegir(persona.innerText);
        	setTimeout(() => {
        		overlay.classList.add("mostrar");
        		popup.classList.add("activo");
        	}, 2000);
        });
    });
}

btn.addEventListener("click", (event) => {
	popup.classList.remove("activo");
	overlay.classList.remove("mostrar");
	setTimeout(() => {
        overlay.classList.remove("activo");
        location.href = "index.html";
    }, 300);
});

var cargarTarjetas = () => {
    grid.innerHTML = "";
    // console.log("Peticion abierta");
    var peticion = new XMLHttpRequest();
    peticion.open('GET', 'php/index.php');

    peticion.onload = () => {
        var datos = JSON.parse(peticion.responseText);

        for (var i = 0; i < datos.length; i++) {
            if (datos[i].noDisponible) {
                agregarHTML(datos[i].nombre, "no-disponible");
            } else {
                agregarHTML(datos[i].nombre, "si");
            }
        }
        cargar();
    }

    peticion.send();
}

var obtener_nombre = () => {
    var peticion = new XMLHttpRequest();
    peticion.open('GET', 'php/obtener_nombre.php');

    peticion.onload = () => {
        var datos = JSON.parse(peticion.responseText);
        if (datos.error) {
            location.href = "php/error.php";
        } else if (datos.ok) {
            nombre_jugador = datos.nombre;
        }
    }

    peticion.send();
}

var agregarHTML = (nombreP, clase) => {
    if(nombre_jugador != nombreP) {
        let tarjeta = document.createElement("div");
        tarjeta.classList.add("tarjeta")

        let tarjetaContenedor = document.createElement("div");
        tarjetaContenedor.classList.add("tarjeta-contenedor");
        tarjetaContenedor.classList.add(clase);

        let front = document.createElement("div");
        front.classList.add("front");

        let back = document.createElement("div");
        back.classList.add("back");

        let nombre = document.createElement("p");
        nombre.classList.add("nombre");

        nombre.innerText = nombreP;
        back.appendChild(nombre);
        tarjetaContenedor.appendChild(front);
        tarjetaContenedor.appendChild(back);
        tarjeta.appendChild(tarjetaContenedor);
        grid.appendChild(tarjeta);
    }
}

var elegir = (nombre) => {
    var peticion = new XMLHttpRequest();
    peticion.open('POST', 'php/elegir.php');

    var parametros = "nombre=" + nombre;
    // console.log(typeof(parametros));
    peticion.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

    peticion.onload = () => {
        var datos = JSON.parse(peticion.responseText);

        if(datos.error){
            alert("Se ha producido un error, por favor inténtelo de nuevo");
        } else if(datos.cargar){
            // alert("Persona elegida");
        }
    }

    peticion.send(parametros);
}

var comprobacion = () => {
    var peticion = new XMLHttpRequest();
    peticion.open('GET', 'php/comprobacion_elegido.php');

    peticion.onload = () => {
        var datos = JSON.parse(peticion.responseText);
        if (datos.redirect == "login") {
            location.href = "vistas/login.html";
        } else if (datos.redirect == "ya_elegido") {
            location.href = "vistas/ya_elegido.html";
        } else{
            usuario.innerText = datos.usuario;
            visitas();
            obtener_nombre();
            cargarTarjetas();
        }
    }

    peticion.send();
}

var comprobar_partida = () => {
    var peticion = new XMLHttpRequest();
    peticion.open('GET', 'php/partidas.php');

    peticion.onload = () => {
        var datos = JSON.parse(peticion.responseText);

        if(datos.error) {
            location.href = "php/error.php";
        } else if(datos.no) {
            location.href = "vistas/no_hay_partidas.html";
        } else {
            comprobacion();
        }
    }

    peticion.send();
}

var visitas = () => {
  var peticion = new XMLHttpRequest();
  peticion.open('GET', 'php/visitas.php');

  peticion.onload = () => {
      var datos = JSON.parse(peticion.responseText);

      if(datos.ok) {
      }
  }

  peticion.send();
}

comprobar_partida();

