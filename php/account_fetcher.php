<?php
    require_once("../db_credentials.php");
    $connection = mysqli_connect($mydb_connect['server'], $mydb_connect['user'], $mydb_connect['psw'], $mydb_connect['db']) or die(mysqli_connect_error);
    if($_POST["tipo"]=="creator"){
        $username = mysqli_real_escape_string($connection, $_POST['username']);
        $res = mysqli_query($connection, "SELECT * FROM creator WHERE username=".$username);
    } else{
        $res = mysqli_query($connection, "SELECT * FROM spettatore WHERE username=".$username);
    }
    if(mysqli_num_rows($res)>0){
        result = array('isPresent'=>'true');
        echo json_encode(result);
    } else{
        result = array('isPresent'=>'false');
        echo json_encode(result);
    }
?>