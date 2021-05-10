
<?php
    $errore = "";
    $connection = mysqli_connect("localhost", "root", "", "vt") or die(mysqli_connect_error());
    if(isset($_POST['username']) && isset($_POST['password']) && isset($_POST['type'])){
        $username = mysqli_real_escape_string($connection, $_POST['username']);
        $password = mysqli_real_escape_string($connection, $_POST['password']);
        $name = mysqli_real_escape_string($connection, $_POST['name']);
        $surname = mysqli_real_escape_string($connection, $_POST['surname']);
        $email = mysqli_real_escape_string($connection, $_POST['email']);
        $query = "SELECT * from spettatore where username = '".$username."'";
        $res = mysqli_query($connection, $query);
        if(mysqli_num_rows($res)>0){
            $errore = "already_registered";
        } else{
            if($_POST['type']=='spectator'){
                $query = "INSERT INTO spettatore(name, surname, username, email, password, anno_iscrizione) VALUES ('"
                .$name."','".$surname."','".$username."','".$email."','".$password."','".date("Y")."');";
                $res = mysqli_query($connection, $query);
                header("Location: hw1.php");
            }
        }
    }

?>

<!DOCTYPE html>
<html>
    <head>
    <meta charset="UTF-8"/>
        <link href="css/signup.css" rel="stylesheet"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>VideoTube Sign Up</title>
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
        <script src="js/signup.js" defer></script>
    </head>
    <body>
        <main>
            <div class="left_image">
                <img src="https://hackernoon.com/hn-images/1*5tInCLyrwLR7g3pdqXlN8A.gif">
            </div>
            <div class="form_container">
            <?php
                        if(isset($errore) && $errore!=""){
                            switch ($errore){
                                case "already_registered":
                                    echo "<div class='error'>";
                                    echo "<h3>Errore</h3>";
                                    echo "<p>Utente già registrato effettua il login</p>";
                                    echo "</div>";
                                    break;
                                default:
                                    echo "<div class='error'>";
                                    echo "<h3>Errore</h3>";
                                    echo "<p>Si è verificato un errore sconosciuto, riprova più tardi</p>";
                                    echo "</div>";
                                    break;
                            }
                        }
                    ?>
                <div id="error" class="error hidden">
                    <h3>Errore</h3>
                    
                </div>
                <div id="close_div">
                    <h1>Sign up</h1>
                    <a href="hw1.php">
                        <img id="close" src="img/icons/close.svg">
                    </a>
                </div>
                <form name="signup_form" method="post">
                    <div id="name_surname">
                        <input name="name" type="text" placeholder="Name"></input>
                        <input name="surname" type="text" placeholder="Surname"></input>
                    </div>
                    <div id="other">
                        <input name="username" type="text" placeholder="Username"></input>
                        <input name="email" type="text" placeholder="Email"></input>
                        <input name="password" type="password" autocomplete placeholder="Password"></input>
                        <input name="confirm" type="password" autocomplete placeholder="Confirm password"></input>
                        <div id="radio_buttons">
                            <input type="radio" value="spectator" checked="true" name="type"></input><label>Spectator</label>
                            <input type="radio" value="creator" name="type"></input><label>Creator</label>
                        </div>
                        <input type="submit" id="signup" value="Sign Up"></input>
                 </div>
                </form>
            </div>
        </main>
    </body>
</html>
