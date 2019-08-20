var crear = document.querySelector("#crear"),
	informacion = document.querySelector("#informacion"),
	t_restantes = document.querySelector("#t_restantes"),
	n_visitas = document.querySelector("#n_visitas"),
	n_jugadores = document.querySelector("#n_jugadores"),
	aceptar = document.querySelector("#aceptar"),
	numero = document.querySelector("#numero"),
	contenedor_jugadores = document.querySelector("#contenedor-jugadores"),
	nueva_partida = document.querySelector("#nueva-partida");

var validar_partida = () => {
	var peticion = new XMLHttpRequest()
	peticion.open('GET', '../php/partidas.php');

	peticion.onload = () => {
		var datos = JSON.parse(peticion.responseText);

		if(datos.ok){
			informacion.style.display = "flex";
			informacion_partida();
			informacion_visitas();
		}
	}

	peticion.send();
}

validar_partida();

var informacion_partida = () => {
	var peticion = new XMLHttpRequest()
	peticion.open('GET', '../php/informacion_partida.php');

	peticion.onload = () => {
		var datos = JSON.parse(peticion.responseText);

		if(datos.error){
			location.href = "../php/error.php";
		} else {
			t_restantes.innerText = datos.tarjetas_restantes;
			n_jugadores.innerText = datos.numero_jugadores;
		}
	}

	peticion.send();
}

var informacion_visitas = () => {
	var peticion = new XMLHttpRequest()
	peticion.open('GET', '../php/obtener_visitas.php');

	peticion.onload = () => {
		var datos = JSON.parse(peticion.responseText);

		if(datos.error){
			location.href = "../php/error.php";
		} else {
			n_visitas.innerText = datos.visitas;
		}
	}

	peticion.send();
}

var agregar = (i) => {
	var jugador = document.createElement("div");
	jugador.classList.add("jugador");

	var titulo = document.createElement("h2");
	titulo.innerText = "Jugador " + i;

	var nombre = document.createElement("p");
	nombre.innerText = "Nombre:"

	var inputn = document.createElement("input");
	inputn.type = "text";
	inputn.name = "nombre" + i;

	var usuario = document.createElement("p");
	usuario.innerText = "Usuario:"

	var inputu = document.createElement("input");
	inputu.type = "text";
	inputu.name = "usuario" + i;

	var pass = document.createElement("p");
	pass.innerText = "Contraseña:";

	var inputp = document.createElement("input");
	inputp.type = "text";
	inputp.name = "pass" + i;

	jugador.appendChild(titulo);
	jugador.appendChild(nombre);
	jugador.appendChild(inputn);
	jugador.appendChild(usuario);
	jugador.appendChild(inputu);
	jugador.appendChild(pass);
	jugador.appendChild(inputp);

	contenedor_jugadores.appendChild(jugador);
}

aceptar.addEventListener("click", () => {

	var num = parseInt(numero.value);

	if (num) {
		contenedor_jugadores.innerHTML = "";
		contenedor_jugadores.style.display = "block";
		for (var i = 1; i <= num; i++) {
			agregar(i);
		}

		var btn = document.createElement("button");
		btn.classList.add("btn");
		btn.innerText = "Enviar";
		btn.id = "enviar";
		contenedor_jugadores.appendChild(btn);
		cargar_btn();
	}
});

crear.addEventListener("click", () => {
	nueva_partida.style.display = "block";
	eliminar_partida();
	informacion.style.display = "none";
});

var cargar_btn = () => {
	var enviar = document.querySelector("#enviar");

	enviar.addEventListener("click", () => {
		crear_partida();
	});
}

var eliminar_partida = () => {
	var peticion = new XMLHttpRequest()
	peticion.open('GET', '../php/eliminar_partida.php');

	peticion.onload = () => {
		var datos = JSON.parse(peticion.responseText);

		if(datos.error){
				location.href = "../php/error.php";
			} else if(datos.ok) {
				alert("Se borró todo");
			}
	}

	peticion.send();
}

var crear_partida = () => {
	var peticion = new XMLHttpRequest()
	peticion.open('POST', '../php/crear_partida.php');

	var jugadores = document.querySelectorAll(".jugador");
	var info_jugadores = [];

	for (var i = 0; i < jugadores.length; i++) {

		var info_jugador = [];
		var nombre = jugadores[i].querySelectorAll("input")[0].value;
		var usuario = jugadores[i].querySelectorAll("input")[1].value;
		var pass = jugadores[i].querySelectorAll("input")[2].value;
		info_jugador['nombre'] = nombre;
		info_jugador['usuario'] = usuario;
		info_jugador['pass'] = pass;

		info_jugadores.push(info_jugador);
	}
	// console.log(info_jugadores);

	var parametros = "";

	var parametrosArr = [];
	for (var i = 0; i < info_jugadores.length; i++) {
		// console.log(info_jugadores[i]);
		a = i + 1;
		var parametros1 = "nombre" + a + "=" + info_jugadores[i].nombre + "&usuario" + a + "=" + info_jugadores[i].usuario + "&pass" + a + "=" + info_jugadores[i].pass;
		// console.log(parametros1);
		// parametrosArr.push(parametros1);
		parametros += parametros1 + "&";
	}

	parametros += "numero=" + info_jugadores.length;
	// console.log(parametros);

	// var parametros = parametrosArr[0] + "&" + parametrosArr[1] + "&numero=" + info_jugadores.length;
	// console.log(parametros);
	peticion.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	peticion.onload = () => {
		var datos = JSON.parse(peticion.responseText);

		if(datos.error){
			location.href = "../php/error.php";
		} else if(datos.ok) {
			alert("Se agregaron todos");
		}
}
	peticion.send(parametros);
}

var val = prompt("Contraseña");
if (val != "123321") {
	location.href = "../";
}