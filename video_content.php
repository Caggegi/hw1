<!DOCTYPE html>
<html>
    <head>
    <meta charset="UTF-8"/>
        <link href="css/video_content.css" rel="stylesheet"/>
        <link rel="icon" href="img/icons/videotube.svg">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <?php
            $connection = mysqli_connect("localhost", "root", "", "vt") or die(mysqli_connect_error());
            $query = "SELECT * from video where id=".$_GET['id'];
            $res = mysqli_query($connection, $query);
            $row = mysqli_fetch_object($res);
            echo "<title>".$row->titolo."</title>";
        ?>
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
        <script src="js/video_content.js" defer></script>
    </head>
    <body>
        <main>
            <div id="video_frame">
            <?php
                echo "<iframe src='https://www.youtube.com/embed/".$_GET['src']."?autoplay=1&controls=0' frameborder='0'>";
                echo "</iframe>";
            ?>
            <div class="controls">
                <div id="page_controls">
                    <a href="hw1.php"><img id="home" src="https://raw.githubusercontent.com/Caggegi/mhw1/master/img/Light/home-outline.svg"></a>
                    <a><img id="recents" src="https://raw.githubusercontent.com/Caggegi/mhw1/master/img/Light/clock-time-four-outline.svg"></a>
                    <a><img id="trend" src="https://raw.githubusercontent.com/Caggegi/mhw1/master/img/Light/trending-up.svg"></a>
                    <a><img id="pref" src="https://raw.githubusercontent.com/Caggegi/mhw1/master/img/Light/heart-outline.svg"></a>
                </div>
                <div id="interact">
                    <div id="feedback">
                        <img id="up" src="https://raw.githubusercontent.com/Caggegi/HW1/main/img/icons/arrowUP.svg">
                        <img id="down" src="https://raw.githubusercontent.com/Caggegi/HW1/main/img/icons/arrowDOWN.svg">
                        <?php
                            $cquery = "SELECT username FROM creator where hash=".$row->creator;
                            $cname = mysqli_query($connection, $cquery);
                            $name = mysqli_fetch_object($cname);
                            echo "<h3>".$name->username."</h3>";
                        ?>
                    </div>
                    <div id="sub_buttons">
                        <?php
                        $creator = $row->creator;
                        session_start();
                        if(!isset($_SESSION['hash'])){
                            session_destroy();
                            echo "<a href='signup.php'><div class='subscribe'><p>subscribe</p></div></a>";
                        } else{
                            $subscribed = "SELECT * FROM segue where spettatore=".$_SESSION['hash']." and creator=".$creator;
                            $SubResponse = mysqli_query($connection, $subscribed);
                            if(mysqli_fetch_object($SubResponse)){
                                echo "<div id='subscribe' class='subscribed' data-creator='".$creator."'><p>subscribe</p></div>";
                            } else{
                                echo "<div id='subscribe' class='subscribe' data-creator='".$creator."'><p>subscribe</p></div>";
                            }
                        }
                        echo "<div id='support' class='support' data-creator='".$creator."'><p>support</p></div>";
                        ?>
                    </div>
                </div>
            </div>
            </div>
            <div id="info">
                <?php
                    echo "<h1>".$row->titolo."</h1>";
                    echo "<section> ";
                    echo "<div class='description'>";
                    echo "<h3>Descrizione</h3> ";
                    echo "<p>".$row->pubblicazione."</p>";
                    echo "</div> ";
                    echo "<p>".$row->descrizione;
                    echo "</p> ";
                    echo "</section>";
                ?>
            </div>
        </main>
    </body>
</html>
<?php
    mysqli_close($connection);
?>