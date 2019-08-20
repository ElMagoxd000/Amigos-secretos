<?php

    error_reporting(0);
    header("Content-type: application/json; charset=utf-8");
    $respuesta = [];
    session_start();
    if(!$_SESSION['usuario']) {
        $respuesta = [
            "error" => true
        ];
    } else {
        $usuario = $_SESSION['usuario'];
        require("conexion.php");
    
        $sql = "SELECT nombre FROM jugadores WHERE usuario = '$usuario'";
        if (!$resultado = $conexion->query($sql)) {
          $respuesta = [
            "error" => true
          ];
        } else {
            $fila = $resultado->fetch_assoc();
          $respuesta = [
            "ok" => true,
            "nombre" => $fila['nombre']
          ];
        }
    }
    echo json_encode($respuesta);
 ?>
