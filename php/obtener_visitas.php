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
		$respuesta = [
			"visitas" => $fila['valor']
		];
	}

	echo json_encode($respuesta);
 ?>