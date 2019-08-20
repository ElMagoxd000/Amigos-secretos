<?php 

	session_start();
	error_reporting(0);
	header("Content-type: application/json; charset=utf-8");

	$respuesta = [];
	if($_SESSION['usuario']){
		$usuario = $_SESSION['usuario'];
		require("conexion.php");
		$sql = "SELECT elegir, jugadorPerteneciente FROM jugadores WHERE usuario = '$usuario'";
		if(!$resultado = $conexion->query($sql)){
			$respuesta = [
				"error" => true
			];
		} else {
			$fila = $resultado->fetch_assoc(); 
			if($fila['elegir'] == 1 && $fila['jugadorPerteneciente']){
				$respuesta = [
					"ok" => true,
					"jugador" => $fila['jugadorPerteneciente']
				];
			}
		}
	} else {
		$respuesta = [
			"error" => true
		];
	}


	echo json_encode($respuesta);
 ?>