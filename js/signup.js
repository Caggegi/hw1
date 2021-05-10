console.log("SignUp");

const signupform = document.forms["signup_form"];

signupform.addEventListener('submit', signupButton);

function signupButton(event){
    const modulo = event.currentTarget;
    const error = document.querySelector("div#error");
    let campo="";
    if(modulo.name.value.length === 0)
        campo="nome";
    else if(modulo.surname.value.length === 0)
        campo="cognome";
    else if(modulo.email.value.length === 0)
        campo="email";
    else if(modulo.password.value.length === 0)
        campo="password";
    else if(modulo.confirm.value.length === 0)
        campo="conferma password";
    if(campo.length!==0){
        event.preventDefault();
        error.innerHTML="";
        const title = document.createElement("h3");
        title.textContent = "Campo vuoto";
        error.appendChild(title);
        const string = document.createElement("p");
        string.textContent = "Il campo "+campo+" è vuoto, compila tutti i campi";
        error.appendChild(string);
        error.classList.remove("hidden");
    } else{
        if(modulo.confirm.value !== modulo.password.value){
            event.preventDefault();
            error.innerHTML="";
            const title = document.createElement("h3");
            title.textContent = "Le password non corrispondono";
            error.appendChild(title);
            const string = document.createElement("p");
            string.textContent = "Assicurati che la password di conferma corrisponda con quella digitata";
            error.appendChild(string);
            error.classList.remove("hidden");
        } else error.classList.add("hidden");
    }
}