document.querySelector("div#sub_buttons div#subscribe").addEventListener("click", onSubscribe);
document.querySelector("div#sub_buttons div#support").addEventListener("click", onSupport);

function onSubscribe(event){
    if(event.currentTarget.classList.contains("subscribe")){
        event.currentTarget.classList.remove("subscribe");
        event.currentTarget.classList.add("subscribed");
        //event.currentTarget.addEventListener("click", onUnsubscribe);
        //event.currentTarget.removeEventListener("click", onSubscribe);
        const action = new FormData();
        action.append("action", "subscribe");
        action.append("creator", event.currentTarget.dataset.creator);
        fetch("php/subscribe.php", {
            'method': 'post',
            'body': action
        });
    } else{
        event.currentTarget.classList.remove("subscribed");
        event.currentTarget.classList.add("subscribe");
        //event.currentTarget.addEventListener("click", onSubscribe);
        //event.currentTarget.removeEventListener("click", onUnsubscribe);
        const action = new FormData();
        action.append("action", "unsubscribe");
        action.append("creator", event.currentTarget.dataset.creator);
        fetch("php/subscribe.php", {
            'method': 'post',
            'body': action
        });
    }
    
}

function onSupport(event){
    event.currentTarget.classList.remove("support");
    event.currentTarget.classList.add("supporting");
    event.currentTarget.addEventListener("click", onUnsupport);
    event.currentTarget.removeEventListener("click", onSupport);
}

function onUnsupport(event){
    event.currentTarget.classList.add("support");
    event.currentTarget.classList.remove("supporting");
    event.currentTarget.addEventListener("click", onSupport);
    event.currentTarget.removeEventListener("click", onUnsupport);
}