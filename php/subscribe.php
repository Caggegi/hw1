<?php
    session_start();
    if(isset($_SESSION['hash']) && isset($_POST['action']) && isset($_POST['creator'])){
        $connection = mysqli_connect("localhost", "root", "", "vt") or die(mysqli_connect_error());
        if($_POST['action']=='subscribe'){
            $query = "INSERT INTO segue values (".$_SESSION['hash'].",".$_POST['creator'].",'".date('Y-m-d')."');";
        } else{
            $query = "DELETE FROM segue WHERE spettatore=".$_SESSION['hash']." and creator=".$_POST['creator'];
        }
        $res = mysqli_query($connection, $query);
        mysqli_close($connection);
        exit;
    }
?>