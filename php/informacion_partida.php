<?php

	error_reporting(0);
	header("Content-type: application/json; charset=utf-8");

	$respuesta = [];
	$error = false;
	$tarjetas = 0;
	$jugadores = 0;
	require ("conexion.php");
	$sql_numero_jugadores = "SELECT count(*) FROM jugadores";
	$sql_contar_tarjetas = "SELECT count(disponible) FROM jugadores WHERE disponible = 1";
	if (!$resultado_contar = $conexion->query($sql_contar_tarjetas)) {
		$error = true;
	} else {

		if ($resultado_contar->num_rows) {
			$fila = $resultado_contar->fetch_assoc();
			$tarjetas = $fila['count(disponible)'];
		} else {
			$tarjetas = 0;
		}
	}

	if (!$resultado_jugadores = $conexion->query($sql_numero_jugadores)) {
		$error = true;
	} else {
		if ($resultado_jugadores->num_rows) {
			$fila = $resultado_jugadores->fetch_assoc();
			$jugadores = $fila['count(*)'];
		} else {
			$jugadores = 0;
		}
	}

	$respuesta = [
		"error" => $error,
		"tarjetas_restantes" => $tarjetas,
		"numero_jugadores" => $jugadores
	];

	echo json_encode($respuesta);

 ?>
