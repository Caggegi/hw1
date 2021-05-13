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
}

function startProcedureUpload(){
    document.querySelector("div.upload").classList.remove("hidden");
    document.querySelector("div.menu_priority").classList.remove("hidden");
    document.querySelector("body").classList.add("no-scroll");
}

function doUpload(){
    const up_form = document.forms['upload_form'];
    const postVideo = new FormData();
    postVideo.append("titolo", up_form.titolo.value);
    postVideo.append("copertina", up_form.copertina.value);
    postVideo.append("descrizione", up_form.descrizione.value);
    postVideo.append("src", up_form.src.value);

    fetch("upload.php", {
        method:'post',
        body: postVideo
    });

    cancelUpload();
}

function showPicMenu(){
    const menu = document.querySelector("div.icon_menu");
    menu.querySelector("input#current_name").value = document.querySelector("input#name_surname").value;
    menu.querySelector("input#current_description").value = document.querySelector("input#email").value;
    menu.querySelector("img#current_picture").src = document.querySelector("input#pic").value;
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

function onError2(error){
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