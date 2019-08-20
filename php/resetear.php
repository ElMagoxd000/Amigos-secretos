<?php

    // error_reporting(0);
    // header("Content-type: application/json; charset=utf-8");
    require("conexion.php");
    $sql = "UPDATE jugadores SET elegir = 0";
    $sql2 = "UPDATE jugadores SET disponible =1";
    $sql3 = "UPDATE jugadores SET jugadorPerteneciente = ''";

    $conexion->query($sql);
    $conexion->query($sql2);
    $conexion->query($sql3);

    echo "Todo reseteado";

 ?>
