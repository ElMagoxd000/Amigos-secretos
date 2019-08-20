// alert();
var nombre_elegido = document.querySelector("#nombre_elegido");

var cargarInfo = () => {
	var peticion = new XMLHttpRequest();
	peticion.open('GET', '../php/informacion_elegido.php');
	// document.write("Si funciona aquí");
	peticion.onload = () => {

		var datos = JSON.parse(peticion.responseText);

		if(datos.ok) {
			// console.log(datos.ok);
			nombre_elegido.innerText = datos.jugador;
		} else if(datos.error) {
			location.href = "../";
		}
	}
	peticion.send();
}

cargarInfo();
