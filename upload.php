<?php
    session_start();
    if(!isset($_SESSION['tipo']) || $_SESSION['tipo']=='spectator'){
        session_destroy();
        header("Location: signup.php");
        exit;
    }
?>

<!DOCTYPE html>
<html>
    <head>
    <meta charset="UTF-8"/>
        <link href="css/upload.css" rel="stylesheet"/>
        <link href="css/user_btn.css" rel="stylesheet"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>VideoTube Upload</title>
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
    </head>
    <body>
        <div class="menu_priority"></div>
        <header class="header">
            <div class="relative">
                <a href="hw1.php"><img src="img/icons/arrow-left.svg"/></a>
                <?php
                    echo "<img id='profile' src='".$_SESSION['pic']."'/>";
                ?>
                <h2>VideoTube Upload</h2>
                <img id="plus_button" src="img/icons/plus.svg"/>
            </div>
        </header>
        <div class="upload">
            <div id="popup_topbar">
                <div class="close_button"></div>
                <div class="upload_button"></div>
            </div>
        </div>
        <main>
            <div class="row">
                <img src="https://www.gamelegends.it/wp-content/uploads/2021/01/cyberpunk-2077-Main-Theme.jpg"/>
                <div>
                    <h2>Titolo</h2>
                    <p>Descrizione</p>
                </div>
            </div>
        </main>
    </body>
</html>