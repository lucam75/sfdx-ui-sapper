export let sendRequest = (url) => {
    let response = fetch(url)
    .then(res => res.json())
    .then(data => {
        response = data;
    }).catch((e) => {
        response = JSON.stringify(e);
    });
    return response;
}