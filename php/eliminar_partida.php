<?php

    error_reporting(0);
    header("Content-type: application/json; charset=utf-8");
    $respuesta = [];

    require("conexion.php");
    $sql = "UPDATE partida SET activo = 0 WHERE nombre = 'partida'";
    $sql_borrar = "DELETE FROM jugadores";
    if(!$conexion->query($sql) || !$conexion->query($sql_borrar)){
        $respuesta = [
            "error" => true,
        ];
    } else {
        $respuesta = [
            "ok" => true
        ];
    }

    echo json_encode($respuesta);
 ?>
