
    let film=0;
    let musica=0;
    let gameplay=0;
    let altro=0;
    for(let elemento of video){
        if(elemento.tipo=='film'){
            film++;
        } else if(elemento.tipo=='musica'){
            musica++;
        } else if(elemento.tipo == 'gameplay'){
            gameplay++;
        } else{
            altro++;
        }
    }
    if(film===0){
        document.querySelector("section#film").classList.add("hide");
        document.querySelector("section#film").classList.remove("show");
    } else{
        document.querySelector("section#film").classList.remove("hide");
        document.querySelector("section#film").classList.add("show");
    }
    if(musica===0){
        document.querySelector("section#musica").classList.add("hide");
        document.querySelector("section#musica").classList.remove("show");
    } else{
        document.querySelector("section#musica").classList.remove("hide");
        document.querySelector("section#musica").classList.add("show");
    }
    if(gameplay===0){
        document.querySelector("section#gameplay").classList.add("hide");
        document.querySelector("section#gameplay").classList.remove("show");
    } else{
        document.querySelector("section#gameplay").classList.remove("hide");
        document.querySelector("section#gameplay").classList.add("show");
    }
    if(altro===0){
        document.querySelector("section#altro").classList.add("hide");
        document.querySelector("section#altro").classList.remove("show");
    } else{
        document.querySelector("section#altro").classList.remove("hide");
        document.querySelector("section#altro").classList.add("show");
    }
    
    for(let elemento of video){
        let sezione=undefined;
        if(elemento.tipo=='film'){
            sezione = document.querySelector("section#film div.show-case");
        } else if(elemento.tipo=='musica'){
            sezione = document.querySelector("section#musica div.show-case");
        } else if(elemento.tipo == 'gameplay'){
            sezione = document.querySelector("section#gameplay div.show-case");
        } else{
            sezione = document.querySelector("section#altro div.show-case");
        }
        create_card(sezione, elemento, true);
    }

const preferiti = [];
const ricerca = [];


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

function aggiungiPreferiti(event){
    if(preferiti.length===0){
        document.querySelector("section#preferiti").classList.add("show");
        document.querySelector("section#preferiti").classList.remove("hide");
        document.querySelector("#no_pref").classList.add("hide");
        document.querySelector("#no_pref").classList.remove("show");
    }
    if(ricerca.length!==0){
        document.querySelector("section#preferiti").classList.add("hide");
        document.querySelector("section#preferiti").classList.remove("show");
    }
    const card = event.currentTarget.parentNode.parentNode;
    const elemento = {
        titolo: card.querySelector("div h5").textContent,
        immagine: card.querySelector("img.image").src,
        creator: card.querySelector("div p").textContent,
        descrizione: card.querySelector("div p.description").textContent,
        id: card.dataset.codice,
        tipo: card.dataset.tipo
    }
    let isPresent = false;
    for(temp of preferiti){
        if(temp.tipo === elemento.tipo && temp.id === elemento.id){
            isPresent = true;
        }
    }
    if(!isPresent){
        preferiti.push(elemento);
        sezione = document.querySelector("section#preferiti div.show-case");
        create_card(sezione, elemento, false);
    }
}

function rimuoviPreferiti(event){
    const card = event.currentTarget.parentNode.parentNode;
    for(elemento of preferiti){
        if(elemento.tipo === card.dataset.tipo && elemento.id === card.dataset.codice){
            preferiti.splice(preferiti.indexOf(elemento),1);
            card.parentNode.removeChild(card);
        }
    }
    if(preferiti.length===0){
        document.querySelector("section#preferiti").classList.add("hide");
        document.querySelector("section#preferiti").classList.remove("show");
        document.querySelector("#no_pref").classList.add("show");
        document.querySelector("#no_pref").classList.remove("hide");
    }
}

const info_button = document.querySelectorAll("div.card div img.info");
for (let button of info_button){
    button.addEventListener("click", mostraDescrizione);
}


const favourites = document.querySelectorAll("div.card div img.preferiti");
for (let button of favourites){
    button.addEventListener("click", aggiungiPreferiti);
}


function avviaRicerca(){
    ricerca.splice(0, ricerca.length);
    const barra_di_ricerca = document.querySelector("header div#search input#search");
    const testo = barra_di_ricerca.value;
    const sezione_ricerca = document.querySelector("section#ricerca div.show-case");
    sezione_ricerca.innerHTML = '';
    if(testo!==""){
        for(let content of video){
            if(content.titolo.toLowerCase().indexOf(testo.toLowerCase())!==-1
            || content.creator.toLowerCase().indexOf(testo.toLowerCase())!==-1){
                ricerca.push(content);
                create_card(sezione_ricerca, content, true);
            }
            }
        if (ricerca.length!==0){
            showsearch();
        } else{
            hidesearch();
        }
    } else{
        hidesearch();
    }
}

const barra_di_ricerca = document.querySelector("header div#search input#search");
barra_di_ricerca.addEventListener("keyup", avviaRicerca);

const mostraPreferiti = document.querySelector("div#preferiti");
const mostraHome = document.querySelector("div#home");

mostraPreferiti.addEventListener("click", showpref);
mostraHome.addEventListener("click", hidesearch);

function hidesearch(){ 
    document.querySelector("section#ricerca").classList.add("hide");
    document.querySelector("section#ricerca").classList.remove("show");
    if(film!==0){
        document.querySelector("section#film").classList.remove("hide");
        document.querySelector("section#film").classList.add("show");
    }
    if(musica!==0){
        document.querySelector("section#musica").classList.remove("hide");
        document.querySelector("section#musica").classList.add("show");
    }
    if(gameplay!==0){
        document.querySelector("section#gameplay").classList.remove("hide");
        document.querySelector("section#gameplay").classList.add("show");
    }
    if(altro!==0){
        document.querySelector("section#altro").classList.remove("hide");
        document.querySelector("section#altro").classList.add("show");
    }
    if(preferiti.length!==0){
        document.querySelector("section#preferiti").classList.remove("hide");
        document.querySelector("section#preferiti").classList.add("show");
    } else{
        document.querySelector("section#preferiti").classList.add("hide");
        document.querySelector("section#preferiti").classList.remove("show");
    }
}

function showsearch(){
    document.querySelector("section#ricerca").classList.add("show");
    document.querySelector("section#ricerca").classList.remove("hide");
    document.querySelector("section#film").classList.remove("show");
    document.querySelector("section#film").classList.add("hide");
    document.querySelector("section#musica").classList.remove("show");
    document.querySelector("section#musica").classList.add("hide");
    document.querySelector("section#gameplay").classList.remove("show");
    document.querySelector("section#gameplay").classList.add("hide");
    document.querySelector("section#preferiti").classList.remove("show");
    document.querySelector("section#preferiti").classList.add("hide");
    document.querySelector("section#altro").classList.remove("show");
    document.querySelector("section#altro").classList.add("hide");
}

function showpref(){
    document.querySelector("section#preferiti").classList.add("show");
    document.querySelector("section#preferiti").classList.remove("hide");
    document.querySelector("section#film").classList.remove("show");
    document.querySelector("section#film").classList.add("hide");
    document.querySelector("section#musica").classList.remove("show");
    document.querySelector("section#musica").classList.add("hide");
    document.querySelector("section#gameplay").classList.remove("show");
    document.querySelector("section#gameplay").classList.add("hide");
    document.querySelector("section#ricerca").classList.remove("show");
    document.querySelector("section#ricerca").classList.add("hide");
    document.querySelector("section#altro").classList.remove("show");
    document.querySelector("section#altro").classList.add("hide");
}

function create_card(sezione, elemento, preferiti){
    if(preferiti){
        _pref='preferiti';
        _img='https://raw.githubusercontent.com/Caggegi/mhw2/master/img/icons/heart-plus.svg';
    } else{
        _pref='rimuovi';
        _img='https://raw.githubusercontent.com/Caggegi/mhw2/master/img/icons/heart-minus.svg';
    }
    const carta = document.createElement("div");
    carta.classList.add("card");
    const immagine = document.createElement("img");
    immagine.src = elemento.immagine;
    immagine.classList.add("image");
    const about = document.createElement("div");
    const titolo = document.createElement("h5");
    titolo.textContent=elemento.titolo;
    const creator = document.createElement("p");
    creator.textContent=elemento.creator;
    const descrizione = document.createElement("p");
    descrizione.textContent=elemento.descrizione;
    descrizione.classList.add("hide");
    descrizione.classList.add("description");
    const plus = document.createElement("img");
    const info = document.createElement("img");
    plus.src=_img;
    plus.dataset.codice = elemento.id;
    plus.dataset.tipo = elemento.tipo;
    plus.classList.add(_pref);
    info.src="https://raw.githubusercontent.com/Caggegi/mhw2/master/img/icons/information.svg";
    info.dataset.codice = elemento.id;
    info.dataset.tipo = elemento.tipo;
    info.classList.add("info");
    about.appendChild(titolo);
    about.appendChild(creator);
    about.appendChild(descrizione);
    about.appendChild(plus);
    about.appendChild(info);
    carta.appendChild(immagine);
    carta.appendChild(about);
    carta.dataset.codice = elemento.id;
    carta.dataset.tipo = elemento.tipo;
    sezione.appendChild(carta);
    const not_favourites = document.querySelectorAll("div.card div img.rimuovi");
    for (let pulsante of not_favourites){
        pulsante.addEventListener("click", rimuoviPreferiti);
    }
    const favourites = document.querySelectorAll("div.card div img.preferiti");
    for (let pulsante of favourites){
        pulsante.addEventListener("click", aggiungiPreferiti);
    }
    const info_button = document.querySelectorAll("div.card div img.info");
    for (let button of info_button){
        button.addEventListener("click", mostraDescrizione);
    }
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
    }).then(OnSaveResponse).then(onSaveJson);
}

function OnSaveResponse(response){
    return response.json();
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
        .then(onResponseUnsplashed, onError2).then(unsplashJson);
    } else{
        fetch(unsplash+"/search/photos/?page=1&query="+category+"&orientation=squarish&content_filter=high&per_page=5",{
            method:"get",
            headers:{
                "Authorization":"Client-ID "+unsplash_key,
            }
        })
        .then(onResponseUnsplashed, onError2).then(unsplashJson);
    }
}

function onResponseUnsplashed(response){
    return response.json();
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