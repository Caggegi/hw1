<?php
    session_start();
    if(isset($_SESSION['hash']) && isset($_SESSION['tipo'])){
        if($_SESSION['tipo']=="spectator"){
            $lista = array();
            $connection = mysqli_connect("localhost", "root", "", "vt") or die(mysqli_connect_error());
            $query = "call chi_segue(".$_SESSION['hash'].");";
            $res = mysqli_query($connection, $query);
            while($row = mysqli_fetch_object($res)){
                $lista[] = array('hash'=>$row->hash, 'username'=>$row->username, 'profile_pic'=>$row->profile_pic);
            }
            echo json_encode($lista);
        } else{
            echo json_encode("{'spectator':'false'}");
        }
    }
?>