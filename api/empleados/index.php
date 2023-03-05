<?php
/* Headers */
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: access");
header("Access-Control-Allow-Methods: GET,POST");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");

/* Conectar a la base de datos con usuario, contraseña y nombre de la DB */
$servidor = "localhost"; $usuario = "root"; $contrasenia = ""; $nombreBD = "empleados";
$conexionBD = new mysqli($servidor, $usuario, $contrasenia, $nombreBD);

/* Consulta datos y recepciona una clave para consultar dichos datos con dicha clave */
if( isset($_GET["consultar"]) ) {
    $sqlEmpleaados = mysqli_query($conexionBD,"SELECT * FROM empleados WHERE id=".$_GET["consultar"]);
    
    if(mysqli_num_rows($sqlEmpleaados) > 0){
        $empleaados = mysqli_fetch_all($sqlEmpleaados,MYSQLI_ASSOC);
        echo json_encode($empleaados);
        exit();

    }else {
        echo json_enconde(["success" => 0]);
    }
}

/* Borrar por medio de un id o clave */
if( isset($_GET["borrar"]) ) {
    $sqlEmpleaados = mysqli_query($conexionBD, "DELETE FROM empleados WHERE id=".$_GET["borrar"]);

    if( $sqlEmpleaados ) {
        echo json_enconde(["success"=> 1]);
        exit();
    }
    else {
        echo json_encode(["success" => 0]);
    }
}

/* Insertar un nuevo registro y recepciona en método POST los datos (nombre, correo) */
if( isset($_GET["insertar"]) ) {
    $data = json_decode(file_get_contents("php://input"));
    $nombre=$data->nombre;
    $correo=$data->correo;

    $sqlEmpleaados = mysqli_query($conexionBD, "INSERT INTO empleados(nombre,correo) VALUES ('$nombre', '$correo')");
    echo json_encode(["success" => 1]);
    exit();
}

/* Actualizar datos recepcionando (nombre, correo ) para la actualizacion de estos */
if( isset($_GET["actualizar"]) ) {
    $data = json_decode(file_get_contents("php://input"));

    $id = $data->id;
    $nombre = $data->nombre;
    $correo = $data->correo;

    $sqlEmpleaados = mysqli_query($conexionBD, "UPDATE empleados SET nombre='$nombre', correo='$correo' WHERE id='$id'");
    echo json_decode(["success" => 1]);
    exit();
}

/* Consultar todos los registros de la tabla empleados */
$sqlEmpleaados = mysqli_query($conexionBD, "SELECT * FROM empleados");
if( mysqli_num_rows($sqlEmpleaados) > 0 ) {
    $empleaados = mysqli_fetch_all($sqlEmpleaados,MYSQLI_ASSOC);
    echo json_encode($empleaados);
}else {
    echo json_encode(["success" => 0]);
}

?>