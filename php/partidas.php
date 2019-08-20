<?php 

	error_reporting(0);
	header("Content-type: application/json; charset=utf-8");

	require("conexion.php");
	$respuesta = [];
	$sql = "SELECT * FROM partida";

	if(!$resultado = $conexion->query($sql)){
		$respuesta = [
			"error" => true
		];
	} else {
		$fila = $resultado->fetch_assoc();
		if($fila['activo'] == 1) {
			$respuesta = [
				"ok" => true
			];
		} else {
			$respuesta = [
				"no" => true
			];
		}
	}

	echo json_encode($respuesta);

 ?>