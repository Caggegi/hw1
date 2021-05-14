<?php
    $contents = array();
    $connection = mysqli_connect("localhost", "root", "", "vt") or die(mysqli_connect_error());
    if(isset($_POST['codice_creator']))
        $query = "SELECT v.titolo, v.immagine, v.descrizione, v.id, v.tipo, c.username FROM video v ".
            "JOIN creator c ON v.creator=c.hash WHERE creator='".$_POST['codice_creator']."';";
    else
        $query = "SELECT v.titolo, v.immagine, v.descrizione, v.src, v.id, v.tipo, c.username FROM video v ".
            "JOIN creator c ON v.creator=c.hash;";
    $res = mysqli_query($connection, $query);
    while($row=mysqli_fetch_assoc($res)){
        $contents[] = array('titolo'=>$row['titolo'], 'immagine'=>$row['immagine'], 'src'=>$row['src'], 
            'id'=>$row['id'], 'descrizione'=>$row['descrizione'], 'tipo'=>$row['tipo'],'creator'=>$row['username']);
        }
    echo json_encode($contents);
?>