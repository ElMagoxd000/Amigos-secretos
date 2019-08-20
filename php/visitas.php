<?php 

	error_reporting(0);
	header("Content-type: application/json; charset=utf-8");
	$respuesta = [];
	require("conexion.php");
	$sql = "SELECT valor FROM visitas WHERE nombre = 'visitas'";

	if (!$resultado = $conexion->query($sql)) {
		$respuesta = [
			"error" => true
		];
	} else {
		$fila = $resultado->fetch_assoc();
		$numero = $fila['valor'] + 1;

		$sql2 = "UPDATE visitas SET valor = $numero WHERE nombre = 'visitas'";
		if (!$resultado2 = $conexion->query($sql2)) {
			$respuesta = [
				"error" => true
			];
		} else {
			$fila2 = $resultado->fetch_assoc();
			$respuesta = [
				"ok" => true
			];
		}
	}

	echo json_encode($respuesta);
 ?>