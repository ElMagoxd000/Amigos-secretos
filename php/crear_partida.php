<?php

    error_reporting(0);
    header("Content-type: application/json; charset=utf-8");
    $respuesta = [];
    $numero = $_POST['numero'];
    require("conexion.php");

    $sql = "UPDATE partida SET activo = 1 WHERE nombre = 'partida'";
    if (!$conexion->query($sql)) {
      $respuesta = [
        "error" => true
      ];
    } else {
      $respuesta = [
        "ok" => true
      ];
    }

    for ($i = 1; $i <= $numero; $i++) {
      $nombre = $_POST["nombre$i"];
      $usuario = $_POST["usuario$i"];
      $pass = $_POST["pass$i"];
      $sql = "INSERT INTO jugadores VALUES('$nombre', 1, '$usuario', '$pass', 0, '')";
      if (!$conexion->query($sql)) {
        $respuesta = [
          "error" => true
        ];
      } else {
        $respuesta = [
          "ok" => true
        ];
      }
    }
    echo json_encode($respuesta);
 ?>
