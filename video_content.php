<!DOCTYPE html>
<html>
    <head>
    <meta charset="UTF-8"/>
        <link href="css/video_content.css" rel="stylesheet"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>VideoTube Content</title>
        <link rel="preconnect" href="https://fonts.gstatic.com">
        <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
    </head>
    <body>
        <main>
            <div id="video_frame">
            <iframe src="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&controls=0" frameborder="0"></iframe>
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
                        <h3>Creator</h3>
                    </div>
                    <div>
                        <div id="subscribe"><p>subscribe</p></div>
                        <div id="support"><p>support</p></div>
                    </div>
                </div>
            </div>
            </div>
            <div id="info">
                <h1>Titolo</h1>
                <section>
                    <div class="description">
                    <h3>Descrizione</h3>
                    <?php echo "<p>".date("d/m/Y")."</p>"; ?>
                    </div>
                    <p>Muppets Characters <br/>Gonzo is a multi-talented artist who performs outrageous daredevil stunts. Though an odd looking creature, Gonzo takes pride in his uniqueness and enjoys every adventure he goes on with the Muppets including the occasional space voyage. Rowlf the Dog is the Muppet’s resident piano player. One of the Muppets oldest characters, Rowlf rose to stardom by first plugging advertisements for his favorite dog-food brands on the original Muppets show. Rowlf the Dog is not the trusty Muppets sidekick  always ready to help Kermit the Frog, Fozzie Bear, Miss Piggy, and the rest of the Muppets. Animal is the wild drummer for the almost-legendary band, Dr. Teeth and The Electric Mayhem...
                    </p>
                </section>
            </div>
        </main>
    </body>
</html>