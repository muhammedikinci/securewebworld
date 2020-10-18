chrome.runtime.onConnect.addListener(function (port) {
    console.assert(port.name == "securewebwhatsapp");
    port.onMessage.addListener(function (msg) {
        chrome.tabs.query({
            active: true,
            currentWindow: true
        }, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, msg, function () {});
        });
    });
});