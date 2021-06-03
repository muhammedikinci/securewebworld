var wp = {
    dict: {"_total": 0},
    setPaneBlur: function () {
        var paneElement = document.querySelector('#pane-side');

        this.setStyle(paneElement, 'filter: blur(10px);');
    },
    removePaneBlur: function () {
        var paneElement = document.querySelector('#pane-side');

        this.removeStyle(paneElement, 'filter: blur(10px);');
    },
    setStyle: function (element, style) {
        if ((element.getAttribute('style') || '').indexOf(style) === -1) {
            element.setAttribute('style', (element.getAttribute('style') || '') + ' ' + style)
        }
    },
    removeStyle: function (element, style) {
        if ((element.getAttribute('style') || '').indexOf(style) !== -1) {
            element.setAttribute('style', element.getAttribute('style').split(style)[0]);
        }
    },
    setBlurPhotos: function () {
        if (window.isblurPhotoIntevalRunning === true) {
            return;
        }

        window.isblurPhotoIntevalRunning = true;

        window.blurPhotoInteval = setInterval(() => {
            var imageListIn = document.querySelectorAll('.message-in img');
            var imageListOut = document.querySelectorAll('.message-out img');

            imageListIn.forEach((element) => {
                this.setStyle(element, 'filter: blur(50px);');
            });

            imageListOut.forEach((element) => {
                this.setStyle(element, 'filter: blur(50px);');
            });
        }, 500);
    },
    setMessageBlur: function () {
        let spans = document.querySelectorAll('span.copyable-text');

        spans.forEach((span, i) => {
            span.setAttribute('style', 'filter: blur(5px)');
            span.addEventListener("mouseenter", function() {
                span.setAttribute('style', '');
            });
            span.addEventListener("mouseleave", function() {
                span.setAttribute('style', 'filter: blur(5px)');
            });
        });
    },
    removeMessageBlur: function () {
        let spans = document.querySelectorAll('span.copyable-text');

        spans.forEach((span, i) => {
            span.setAttribute('style', '');
        });
    },
    removePhotoBlur: function () {
        window.isblurPhotoIntevalRunning = false;
        clearInterval(window.blurPhotoInteval);

        var imageListIn = document.querySelectorAll('.message-in img');
        var imageListOut = document.querySelectorAll('.message-out img');

        imageListIn.forEach((element) => {
            this.removeStyle(element, 'filter: blur(50px);');
        });

        imageListOut.forEach((element) => {
            this.removeStyle(element, 'filter: blur(50px);');
        });
    },
    storeMessages: function () {
        wp.dict = {};

        function CollectData() {
            let spans = document.querySelectorAll('span[title]');
            let datas = [];

            spans.forEach((span, i) => {
                if (i % 2 === 0 && spans[i + 1] && spans[i + 1].textContent) {
                    datas.push({
                        title: span.textContent,
                        content: spans[i + 1].textContent
                    });
                }
            });

            return datas;
        }

        function DetectChanges() {
            let messages = CollectData();

            if (!wp.dict["_total"]) {
                wp.dict["_total"] = messages.length;

                messages.forEach((message) => {
                    wp.dict[message.title] = [message.content];
                });
            } else {
                messages.forEach((message) => {
                    if (wp.dict[message.title] && wp.dict[message.title].indexOf(message.content) === -1) {
                        wp.dict[message.title].push(message.content);
                    } else if (!wp.dict[message.title]) {
                        wp.dict["_total"] = wp.dict["_total"] + 1;
                        wp.dict[message.title] = [message.content];
                    }
                });
            }

        }

        let observer = new MutationObserver(mutationRecords => {
            DetectChanges();
        });

        var myInterval = setInterval(() => {
            if (document.querySelector('.app-wrapper-web')) {
                observer.observe(document.querySelector('#pane-side') || document.querySelector('#side'), {
                    childList: true,
                    subtree: true,
                    characterDataOldValue: true
                });

                clearInterval(myInterval);
            }
        }, 500);
    },
    openMessages: function () {
        var messageHtml = '';

        Object.getOwnPropertyNames(wp.dict).forEach((propName) => {
            if (propName === "_total") {return false;}
            messageHtml += `<li class="li">${propName}`;

            if (typeof wp.dict[propName].length === 'undefined') {return false;}

            wp.dict[propName].forEach((message) => {
                messageHtml += `<p>${message}</p>`;
            });

            messageHtml += '</li>';
        });

        var messagesComp = `
            <link href="https://fonts.googleapis.com/css?family=Quicksand&display=swap" rel="stylesheet">
            <style>
                all: initial;
                * {
                    all: unset;
                }
                .removeCamp {
                    color: white;
                    font-size: 15px;
                    position: absolute;
                    right: 0px;
                    top: -27px;
                    background-color: red;
                    padding: 10px;
                    font-family: 'Quicksand', sans-serif;
                    cursor: pointer;
                }
                a.removeCamp:hover {
                    background-color: #454545;
                    transition: all 0.5s ease;
                }
                .a {
                    color: black;
                    font-family: 'Quicksand', sans-serif;
                    font-size: 12px;
                    cursor: pointer;
                }
                .hov:hover {
                    background-color:#ccc;
                    color: white !important;
                    transition: all 0.5s ease;
                }
                .ul {
                    list-style-type: none;
                    padding: 0;
                    margin-top: 10px;
                    background-color: #eaeaea;
                    height: 350px;
                    overflow: scroll;
                }
                .li {
                    padding: 5px;
                    margin-top: 5px;
                    border: 1px solid #a1a1a1;
                }
                p {
                    background-color: #ccc;
                    padding: 3px;
                }
            </style>
            <a onClick="document.querySelector('#messagesComp').remove()" class="removeCamp"> >></a>
            <ul class="ul">
                ${messageHtml}
            </ul>
        `;

        if (document.querySelector('#messagesComp') === null) {
            var messagesCompElement = document.createElement('div');
            messagesCompElement.id = 'messagesComp';
            messagesCompElement.style = `
                z-index: 99999;
                position: fixed;
                height: 350px;
                width: 400px;
                bottom: 0;
                background-color: #eaeaea95;
                right:0;
                text-align: center;`;

            document.body.insertBefore(messagesCompElement, document.body.firstChild);

            var ShadowHost = document.getElementById('messagesComp');
            var ShadowRoot = ShadowHost.attachShadow({mode: 'closed'});

            ShadowRoot.innerHTML = messagesComp;
        }
    }
}

var myInterval = setInterval(() => {
    if (document.querySelector('.app-wrapper-web') && document.querySelector('#pane-side')) {
        wp.storeMessages();
        clearInterval(myInterval);
    }
}, 500);

chrome.runtime.onMessage.addListener(function (data, callback) {
    if (typeof wp[data] === "function") {
        wp[data]();
    }
});

