chrome.runtime.onMessage.addListener((request, sender, send_response) => {
    if (request.type === "FETCH_REVIEWS_PAGE"){
        fetch(request.url)
            .then(res => res.text())
            .then(html => send_response({ html }))
            .catch(err => send_response({error : err.toString()}));
        return true;
    }
});