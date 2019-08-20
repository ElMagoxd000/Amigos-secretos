var formulario = document.formulario,
	inputText = document.querySelectorAll(".input"),
	btnEnviar = document.querySelector("#enviar"),
	usuario = document.querySelector("#usuario"),
	pass = document.querySelector("#pass"),
	alerta = document.querySelector("#alert");

inputText.forEach((elemento)=>{
	elemento.addEventListener("focus", (event) => {
		// console.log(event.target);
		event.target.classList.add("activo");
		event.target.parentNode.querySelector("label").classList.add("activo");	
	});

	elemento.addEventListener("blur", (event) => {
		// console.log(event.target.value);
		if (event.target.value == "") {
			event.target.classList.remove("activo");
			event.target.parentNode.querySelector("label").classList.remove("activo");
		}
	});
});

btnEnviar.addEventListener("click", (event) => {
	event.preventDefault();
	let usuariot = usuario.value,
		passt = pass.value;
	if ((usuariot == null || usuariot == "") || (passt == null || passt == "")) {
		// alert("Completa el formulario");
		alerta.style.display = "block";
		alerta.innerText = "Complete todos los campos";
	} else {
		// formulario.submit();
		ingresar();
	}
});

var ingresar = () => {
	var peticion = new XMLHttpRequest();
	peticion.open("POST", "../php/login.php");

	var parametros = 'usuario=' + usuario.value + '&pass=' + pass.value;
	peticion.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

	peticion.onload = () => {
		var datos =JSON.parse(peticion.responseText);

		if (datos.error) {
			alerta.style.display = "block";
			alerta.innerText = datos.mensaje;
		} else if (datos.ok) {
			console.log("Correcto");
			location.href = "../";
		}
	}

	peticion.send(parametros);
}