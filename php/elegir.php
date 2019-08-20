<?php

	session_start();
	error_reporting(0);
	header("Content-type: application/json; charset=utf-8");
	$respuesta = [];
	if (!$_SESSION['usuario'] || !$_POST['nombre']) {
		$respuesta = [
			"error" => true
		];
	} else {
		$usuario = $_SESSION['usuario'];
		$nombre = $_POST['nombre'];
		// $usuario = "apple";
		require("conexion.php");

		$sql_elegir = "UPDATE jugadores SET elegir = 1 WHERE usuario = '$usuario'";
		$sql_elegido = "UPDATE jugadores SET disponible = 0 WHERE nombre = '$nombre'";
        $sql_perteneciente = "UPDATE jugadores SET jugadorPerteneciente = '$nombre' WHERE usuario = '$usuario'";
		if((!$resultado_elegir = $conexion->query($sql_elegir)) || (!$resultado_elegido = $conexion->query($sql_elegido)) || (!$resultado_perteneciente = $conexion->query($sql_perteneciente))){
			$respuesta = [
				"error" => true
			];
		} else {
			$respuesta = [
				"cargar" => true
			];
		}
	}

	echo json_encode($respuesta);

 ?>
