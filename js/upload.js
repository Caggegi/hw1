<<<<<<< HEAD
const closeB = document.querySelector("div#closeUploadMenu");
const uploadB = document.querySelector("div.upload_button");
const plus = document.querySelector("img#plus_button");
const profile = document.querySelector("img#profile");

closeB.addEventListener("click", cancelUpload);
plus.addEventListener("click", startProcedureUpload);
uploadB.addEventListener("click", doUpload);
profile.addEventListener("click", showPicMenu);
document.querySelector("div#closePicMenu").addEventListener("click", closePicMenu);
document.querySelector("div#savePicMenu").addEventListener("click", saveIconMenu);

function cancelUpload(){
    document.querySelector("div.upload").classList.add("hidden");
    document.querySelector("div.menu_priority").classList.add("hidden");
    const inputs = document.querySelectorAll("div.text_input input");
    for(i of inputs){
        i.value = "";
    }
    document.querySelector("body").classList.remove("no-scroll");
    document.querySelector("p#errore_upload").classList.add("hidden");
}

function startProcedureUpload(){
    document.querySelector("div.upload").classList.remove("hidden");
    document.querySelector("div.menu_priority").classList.remove("hidden");
    document.querySelector("body").classList.add("no-scroll");
}

function doUpload(){
    const up_form = document.forms['upload_form'];
    let description=up_form.descrizione.value;
    if(description.length>250){
        let trim = description.substring(0, 250);
        description=trim+"...";
    }
    const postVideo = new FormData();
    postVideo.append("titolo", up_form.titolo.value);
    postVideo.append("copertina", up_form.copertina.value);
    postVideo.append("descrizione", description);
    postVideo.append("src", up_form.src.value);
    postVideo.append("tipo", up_form.type.value);

    fetch("php/video_poster.php", {
        method:'post',
        body: postVideo
    }).then(onJsonResponse).then(onUploadJson);

}

function onJsonResponse(response){
    return response.json();
}

function onUploadJson(json){
    console.log(json.risposta)
    if(json.risposta == 'video_caricato'){
        let VideoRow = document.createElement("div");
        VideoRow.classList.add("row");
        let imageC = document.createElement("img");
        imageC.src=json.copertina;
        let row_div = document.createElement("div");
        let row_title = document.createElement("h2");
        row_title.textContent = json.titolo;
        let row_des = document.createElement("p");
        row_des.textContent = json.descrizione;
        row_div.appendChild(row_title);
        row_div.appendChild(row_des);
        VideoRow.appendChild(imageC);
        VideoRow.appendChild(row_div);
        document.querySelector("main").appendChild(VideoRow);
        cancelUpload();
    }
    else{
        document.querySelector("p#errore_upload").classList.remove("hidden");
        const inputs = document.querySelectorAll("div.text_input input");
        for(i of inputs){
            i.value = "";
        }
    }
}

function showPicMenu(){
    const menu = document.querySelector("div.icon_menu");
    menu.querySelector("input#current_name").value = document.querySelector("input#name_surname").value;
    menu.querySelector("input#current_description").value = document.querySelector("input#email").value;
    menu.querySelector("img#current_picture").src = profile.src;
    menu.classList.remove("hidden");
    document.querySelector("body").classList.add("no-scroll");
    showUnsplashed("");
}

function closePicMenu(){
    document.querySelector("div.icon_menu").classList.add("hidden");
    document.querySelector("body").classList.remove("no-scroll");
}

function saveIconMenu(){
    const Nome_Cognome = document.querySelector("input#current_name").value;
    const Email = document.querySelector("input#current_description").value;
    const PPic = document.querySelector("div.icon_menu div.m_body div.current img#current_picture").src;
    document.querySelector("div.menu_priority").classList.add("hidden");
    document.querySelector("div.icon_menu").classList.add("hidden");
    profile.src = PPic;
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

const changeProfilePicture = document.querySelector("form#choose_category");
changeProfilePicture.addEventListener("submit", reloadPicCategories);

function reloadPicCategories(event){
    event.preventDefault();
    const category = document.querySelector("form#choose_category input#category");
    showUnsplashed(category.value);
}

function showUnsplashed(category){
    document.querySelector("div.icon_menu div.m_body div.pick").innerHTML = "";
    fetch("php/unsplash_caller.php?categoria="+category).then(onJsonResponse).then(unsplashJson);
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
=======
const closeB = document.querySelector("div#closeUploadMenu");
const uploadB = document.querySelector("div.upload_button");
const plus = document.querySelector("img#plus_button");
const profile = document.querySelector("img#profile");

closeB.addEventListener("click", cancelUpload);
plus.addEventListener("click", startProcedureUpload);
uploadB.addEventListener("click", doUpload);
profile.addEventListener("click", showPicMenu);
document.querySelector("div#closePicMenu").addEventListener("click", closePicMenu);
document.querySelector("div#savePicMenu").addEventListener("click", saveIconMenu);

function cancelUpload(){
    document.querySelector("div.upload").classList.add("hidden");
    document.querySelector("div.menu_priority").classList.add("hidden");
    const inputs = document.querySelectorAll("div.text_input input");
    for(i of inputs){
        i.value = "";
    }
    document.querySelector("body").classList.remove("no-scroll");
    document.querySelector("p#errore_upload").classList.add("hidden");
}

function startProcedureUpload(){
    document.querySelector("div.upload").classList.remove("hidden");
    document.querySelector("div.menu_priority").classList.remove("hidden");
    document.querySelector("body").classList.add("no-scroll");
}

function doUpload(){
    const up_form = document.forms['upload_form'];
    let description=up_form.descrizione.value;
    if(description.length>250){
        let trim = description.substring(0, 250);
        description=trim+"...";
    }
    const postVideo = new FormData();
    postVideo.append("titolo", up_form.titolo.value);
    postVideo.append("copertina", up_form.copertina.value);
    postVideo.append("descrizione", description);
    postVideo.append("src", up_form.src.value);
    postVideo.append("tipo", up_form.type.value);

    fetch("php/video_poster.php", {
        method:'post',
        body: postVideo
    }).then(onJsonResponse).then(onUploadJson);

}

function onJsonResponse(response){
    return response.json();
}

function onUploadJson(json){
    console.log(json.risposta)
    if(json.risposta == 'video_caricato'){
        let VideoRow = document.createElement("div");
        VideoRow.classList.add("row");
        let imageC = document.createElement("img");
        imageC.src=json.copertina;
        let row_div = document.createElement("div");
        let row_title = document.createElement("h2");
        row_title.textContent = json.titolo;
        let row_des = document.createElement("p");
        row_des.textContent = json.descrizione;
        row_div.appendChild(row_title);
        row_div.appendChild(row_des);
        VideoRow.appendChild(imageC);
        VideoRow.appendChild(row_div);
        document.querySelector("main").appendChild(VideoRow);
        cancelUpload();
    }
    else{
        document.querySelector("p#errore_upload").classList.remove("hidden");
        const inputs = document.querySelectorAll("div.text_input input");
        for(i of inputs){
            i.value = "";
        }
    }
}

function showPicMenu(){
    const menu = document.querySelector("div.icon_menu");
    menu.querySelector("input#current_name").value = document.querySelector("input#name_surname").value;
    menu.querySelector("input#current_description").value = document.querySelector("input#email").value;
    menu.querySelector("img#current_picture").src = profile.src;
    menu.classList.remove("hidden");
    document.querySelector("body").classList.add("no-scroll");
    showUnsplashed("");
}

function closePicMenu(){
    document.querySelector("div.icon_menu").classList.add("hidden");
    document.querySelector("body").classList.remove("no-scroll");
}

function saveIconMenu(){
    const Nome_Cognome = document.querySelector("input#current_name").value;
    const Email = document.querySelector("input#current_description").value;
    const PPic = document.querySelector("div.icon_menu div.m_body div.current img#current_picture").src;
    document.querySelector("div.menu_priority").classList.add("hidden");
    document.querySelector("div.icon_menu").classList.add("hidden");
    profile.src = PPic;
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

const changeProfilePicture = document.querySelector("form#choose_category");
changeProfilePicture.addEventListener("submit", reloadPicCategories);

function reloadPicCategories(event){
    event.preventDefault();
    const category = document.querySelector("form#choose_category input#category");
    showUnsplashed(category.value);
}

function showUnsplashed(category){
    document.querySelector("div.icon_menu div.m_body div.pick").innerHTML = "";
    fetch("php/unsplash_caller.php?categoria="+category).then(onJsonResponse).then(unsplashJson);
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
>>>>>>> c8af1445bccefbdaf3e9bbaadef53fffe475d24f
}