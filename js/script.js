const preferiti = [];
const ricerca = [];


//info buttons
const info_button = document.querySelectorAll("div.card div img.info");
for (let button of info_button){
    button.addEventListener("click", mostraDescrizione);
}

function mostraDescrizione(event){
    const button = event.currentTarget;
    const descrizione = button.parentNode.querySelector("p.hide");
    if (descrizione !== null){
        descrizione.classList.add("show");
        descrizione.classList.remove("hide");
    }
    else{
        const descrizione = button.parentNode.querySelector("p.description");
        descrizione.classList.add("hide");
        descrizione.classList.remove("show");
    }
}

//favourites buttons
const favourites = document.querySelectorAll("div.card div img.preferiti");
for (let button of favourites){
    button.addEventListener("click", aggiungiPreferiti);
}

function onShowPrefJson(json){
    if(json.length===0){
        const nopref = document.createElement("h3");
        nopref.textContent = "Non hai ancora dei preferiti";
        document.querySelector("section#preferiti").appendChild(nopref);
    }
    else{
        for(element of json){
            create_card(document.querySelector("section#preferiti div.show-case"), element, false);
        }
    }
}

function showpref(){
    article.innerHTML=  "<section class='genre' id='preferiti'><h2>Preferiti</h2><div class='show-case'></div></section>";
    fetch("php/video_fetcher.php?modalita=preferiti").then(onJsonResponse).then(onShowPrefJson);
}

const mostraPreferiti = document.querySelector("div#preferiti");
const mostraHome = document.querySelector("div#home");

mostraPreferiti.addEventListener("click", showpref);
mostraHome.addEventListener("click", showHome);

const barra_di_ricerca = document.querySelector("header div#search input#search");
barra_di_ricerca.addEventListener("keyup", avviaRicerca);



function avviaRicerca(){
    ricerca.splice(0, ricerca.length);
    const barra_di_ricerca = document.querySelector("header div#search input#search");
    const testo = barra_di_ricerca.value;
    if(testo!=="") showSearch(testo);
    else showHome();
}

document.querySelector("header div#info").addEventListener("click", changePic);
document.querySelector("img#mobile_pic").addEventListener("click", changePic);
document.querySelector("div.icon_menu div.m_header div.window_buttons div.save_button").addEventListener("click", saveIconMenu);
document.querySelector("div.icon_menu div.m_header div.window_buttons div.close_button").addEventListener("click", closeIconMenu);

function changePic(event){
    document.querySelector("div.menu_priority").classList.remove("hide");
    const menu = document.querySelector("div.icon_menu");
    const tg = document.querySelector("header div#info div#account");
    menu.querySelector("input#current_name").value = tg.querySelector("h3").textContent;
    menu.querySelector("input#current_description").value = tg.querySelector("p").textContent;
    menu.querySelector("img#current_picture").src = tg.querySelector("img").src;
    menu.classList.remove("hide");
    document.querySelector("body").classList.add("no-scroll");
    showUnsplashed("");
}

function saveIconMenu(){
    const Nome_Cognome = document.querySelector("input#current_name").value;
    const Email = document.querySelector("input#current_description").value;
    const PPic = document.querySelector("div.icon_menu div.m_body div.current img#current_picture").src;
    document.querySelector("div.menu_priority").classList.add("hide");
    document.querySelector("div.icon_menu").classList.add("hide");
    document.querySelector("header div#info h3").textContent = Nome_Cognome;
    document.querySelector("header div#info p").textContent = Email;
    document.querySelector("header div#info img").src = PPic
    document.querySelector("header div#search div img.mobile").src = PPic;
    document.querySelector("body").classList.remove("no-scroll");

    //mando i cambiamenti al database
    const formdata = new FormData();
    formdata.append("nome", Nome_Cognome);
    formdata.append("email", Email);
    formdata.append("image", PPic);

    fetch("php/accountDetails.php", {
        method:'post',
        body: formdata
    }).then(onJsonResponse).then(onSaveJson);
}

function onSaveJson(json){
    console.log(json);
}

function closeIconMenu(){
    document.querySelector("div.menu_priority").classList.add("hide");
    document.querySelector("div.icon_menu").classList.add("hide");
    document.querySelector("body").classList.remove("no-scroll");
}

//Dipendenze API siti terzi

const header = document.querySelector("header div#background");

fetch("https://picsum.photos/2000/700").then(onResponse, onError);

function onResponse(response){
    header.style.backgroundImage = "url("+response.url+")";
}

function onError(error){
    header.style.backgroundImage = "url('https://raw.githubusercontent.com/Caggegi/HW1/main/img/default.jpg')";
}

function onError2(error){
}

const unsplash_key = "TiyMZxRbh4vc2ZZCNtHMe7FSYjMU2uGn2iryP_wb2n4";
const unsplash = "https://api.unsplash.com/"

const changeProfilePicture = document.querySelector("form#choose_category");
changeProfilePicture.addEventListener("submit", reloadPicCategories);

function reloadPicCategories(event){
    event.preventDefault();
    const category = document.querySelector("form#choose_category input#category");
    showUnsplashed(category.value);
}

function showUnsplashed(category){
    document.querySelector("div.icon_menu div.m_body div.pick").innerHTML = "";
    if(category === ""){
        fetch(unsplash+"/search/photos/?page="+Math.floor(Math.random()*9)+1+"&query=pattern"
                                      +"&orientation=squarish&content_filter=high&per_page=5",{
            method:"get",
            headers:{
                "Authorization":"Client-ID "+unsplash_key,
            }
        })
        .then(onJsonResponse, onError2).then(unsplashJson);
    } else{
        fetch(unsplash+"/search/photos/?page=1&query="+category+"&orientation=squarish&content_filter=high&per_page=5",{
            method:"get",
            headers:{
                "Authorization":"Client-ID "+unsplash_key,
            }
        })
        .then(onJsonResponse, onError2).then(unsplashJson);
    }
}

function unsplashJson(json){
    const risultati = json.results;
    if(risultati.length===0){
        const no_items = document.createElement("p");
        const category = document.querySelector("form#choose_category input#category");
        no_items.textContent = "Nessun risultato ottenuto per "+category.value;
        document.querySelector("div.icon_menu div.m_body div.pick").appendChild(no_items);
    } else{
        for(let i=0; i<risultati.length; i++){
            append_candidate(risultati[i].urls.thumb);
        }
    }
}

function changeCurrentPic(event){
    document.querySelector("div.icon_menu div.m_body div.current img#current_picture").src = event.currentTarget.src;
}

function append_candidate(src){
    const section = document.querySelector("div.icon_menu div.m_body div.pick");
    const image = document.createElement("img");
    image.src = src;
    image.classList.add("picture_candidate");
    image.classList.add("desktop");
    image.addEventListener("click",changeCurrentPic);
    section.appendChild(image);
}