<?php
    require_once("../db_credentials.php");
    $connection = mysqli_connect($mydb_connect['server'], $mydb_connect['user'], $mydb_connect['psw'], $mydb_connect['db']) or die(mysqli_connect_error);
    if($_POST["tipo"]=="creator"){
        $res = mysqli_query($connection, "SELECT * FROM creator WHERE username=".$_POST['username']);
    } else{
        $res = mysqli_query($connection, "SELECT * FROM spettatore WHERE username=".$_POST['username']);
    }
    if(mysqli_fetch_object($res)){
        echo "{'is_present':'true'}";
    } else echo "{'is_present':'false'}";
?>