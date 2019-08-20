<?php

    error_reporting(0);
    header("Content-type: application/json; charset=utf-8");
    session_start();
    $respuesta = [];
    if (!isset($_SESSION['usuario'])) {
        $respuesta = [
            "redirect" => "login"
        ];
    } else {
        $usuario = $_SESSION['usuario'];
        require("conexion.php");
        $sql = "SELECT elegir FROM jugadores WHERE usuario = '$usuario'";
        if(!$resultado = $conexion->query($sql)){
            $respuesta = [
                "error" => true
            ];
        } else {
            $fila = $resultado->fetch_assoc();
            if($fila['elegir'] == 1){
                $respuesta = [
                    "redirect" => "ya_elegido"
                ];
            } else {
                $respuesta = [
                    "ok" => true,
                    "usuario" => $usuario
                ];
            }
        }
    }

    echo json_encode($respuesta);
 ?>
