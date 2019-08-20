<?php

	error_reporting(0);
	header('Content-type: application/json; charset=utf-8');

	session_start();
	$usuario = "";
	$pass = "";

	if (!empty($_POST)) {
		$usuario = $_POST['usuario'];
		$pass = $_POST['pass'];
	} else {
		header("location: ../index.php");
	}

	require ('conexion.php');

	// echo "$usuario $pass <br>";
	$respuesta = [];
	$sql = "SELECT * FROM jugadores WHERE usuario = '$usuario' AND pass = '$pass'";

	if (!$resultado = $conexion->query($sql)) {
		$respuesta = [
			"error" => true,
			"mensaje" => "Hubo un error con la consulta"
		];
		// echo "SQL: " . $sql . "<br>";
		// echo "Errno: " . $conexion->errno . "<br>";
		// echo "Error: " . $conexion->error;
	} else {
		if ($resultado->num_rows === 1) {
			$fila = $resultado->fetch_assoc();
			$_SESSION['usuario'] = $fila['usuario'];
			// header('location: ../');
			$respuesta = [
				"ok" => true
			];
		} else {
			$respuesta = [
				"error" => true,
				"mensaje" => "No se encontró el usuario"
			];
		}
	}

	echo json_encode($respuesta);

 ?>