// ==UserScript==
// @name         Secure Web Whatsapp
// @namespace    https://github.com/muhammedikinci/securewebwhatsapp
// @version      0.1
// @description  Blur your images and contacts
// @author       Muhammed İKİNCİ
// @match        https://web.whatsapp.com/
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    window.secureWP = {
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
        componentMenu: function () {
            var compMenu = `
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
                    }

                    .li {
                        padding: 5px;
                    }
                </style>

                <a onClick="document.querySelector('#compMenu').remove()" class="removeCamp"> >></a>
                <ul class="ul">
                    <li class="li hov"><a class="a" onClick="window.secureWP.setPaneBlur()" >Set Pane Blur</a></li>
                    <li class="li hov"><a class="a" onClick="window.secureWP.removePaneBlur()" >Remove Pane Blur</a></li>
                    <li class="li hov"><a class="a" onClick="window.secureWP.setBlurPhotos()" >Photo Blur</a></li>
                    <li class="li hov"><a class="a" onClick="window.secureWP.removePhotoBlur()" >Remove Photo Blur</a></li>
                </ul>
            `;

            if (document.querySelector('#compMenu') === null) {
                var compMenuElement = document.createElement('div');
                compMenuElement.id = 'compMenu';
                compMenuElement.style = `
                    z-index: 99999;
                    position: fixed;
                    height: 100px;
                    width: 150px;
                    bottom: 45%;
                    right:0;
                    text-align: center;`;

                document.body.insertBefore(compMenuElement, document.body.firstChild);

                var ShadowHost = document.getElementById('compMenu');
                var ShadowRoot = ShadowHost.attachShadow({mode: 'closed'});

                ShadowRoot.innerHTML = compMenu;
            }
        }
    }

    window.secureWP.componentMenu();
})();
