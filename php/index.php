<?php

    error_reporting(0);
    header("Content-type: application/json; charset=utf-8");
    session_start();

    require("conexion.php");
    $sql = "SELECT * FROM jugadores";
    $respuesta = [];
    if (!$resultado = $conexion->query($sql)) {
        header('location: php/error.php');
    } else {
        while ($fila = $resultado->fetch_assoc()) {
            if($fila['disponible'] == 0){
                $jugador = [
                    "noDisponible" => true,
                    "nombre" => $fila['nombre']
                ];

                array_push($respuesta, $jugador);
            } else {
                $jugador = [
                    "nombre" => $fila['nombre']
                ];
                array_push($respuesta, $jugador);
            }
        }
    }
    // $statement->execute();
    // $resultado = $statement->fetch_assoc();
    // while ($fila = $resultado->fetch_assoc()) {
    //     $jugadores = $fila['activo'];
    // }

    echo json_encode($respuesta);

 ?>