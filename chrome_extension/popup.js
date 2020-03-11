let setPaneBlur = document.getElementById('setPaneBlur');
let removePaneBlur = document.getElementById('removePaneBlur');
let showMessages = document.getElementById('showMessages');

let setPhotoBlur = document.getElementById('setPhotoBlur');
let removePhotoBlur = document.getElementById('removePhotoBlur');

var port = chrome.runtime.connect({name: "securewebwhatsapp"});

setPaneBlur.addEventListener("click", function() {
    port.postMessage("setPaneBlur");
});

removePaneBlur.addEventListener("click", function() {
    port.postMessage("removePaneBlur");
});

setPhotoBlur.addEventListener("click", function() {
    port.postMessage("setBlurPhotos");
});

removePhotoBlur.addEventListener("click", function() {
    port.postMessage("removePhotoBlur");
});

showMessages.addEventListener("click", function() {
    port.postMessage("openMessages");
});