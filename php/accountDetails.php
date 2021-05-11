<?php
    session_start();
    if(isset($_SESSION['hash']) && isset($_SESSION['tipo'])){
        $connection = mysqli_connect("localhost", "root", "", "vt") or die(mysqli_connect_error());
        if($_SESSION['tipo']=='spectator'){
            $n_c = explode(" ",$_POST['nome']);
            $query = "UPDATE spettatore SET name='".$n_c[0]
            ."', surname='".$n_c[1]."', email='".$_POST['email']."', profile_pic='".$_POST['image']
            ."' where hash='".$_SESSION['hash']."';";
        } else if($_SESSION['tipo']=='creator'){
            $n_c = explode(" ",$_POST['nome']);
            $query = "UPDATE creator SET name='".$n_c[0]
            ."', surname='".$n_c[1]."', email='".$_POST['email']."', profile_pic='".$_POST['image']
            ."' where hash='".$_SESSION['hash']."';";
        }
        $res = mysqli_query($connection, $query);
        mysqli_close($connection);
        echo json_encode("{'query' : 'done'}");
    } else{
        echo json_encode("{'query' : 'unknown user'}");
    }
?>