<?php
    session_start();
    if(isset($_SESSION['hash']) && isset($_POST['azione']) && isset($_POST['video_id'])){
        $connection = mysqli_connect("localhost", "root", "", "vt") or die(mysqli_connect_error());
        if($_POST['azione']=="aggiungi")
            $query='INSERT INTO preferiti (spettatore, video) values ('.$_SESSION['hash'].','.$_POST['video_id'].')';
        else
            $query="DELETE FROM preferiti WHERE spettatore=".$_SESSION['hash']." AND video=".$_POST['video_id'];
        $res = mysqli_query($connection, $query);
        mysqli_close($connection);
        echo "query ok";
        exit;
    }
    echo "query non completata";
    exit;
?>