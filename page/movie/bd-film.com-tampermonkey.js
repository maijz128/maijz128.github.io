// ==UserScript==
// @name         bd-film.com movie to movies json
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        http://www.bd-film.com/*/*.htm
// @grant        none
// @require      https://cdn.bootcss.com/clipboard.js/1.7.1/clipboard.min.js
// ==/UserScript==

(function () {
    initUI();
    var clipboard = new Clipboard(".btn-clipboard");
})();

function newJSON() {
    return {
        "name": "",
        "IMDb": "",
        "Douban": "",
        "links": {
            "ed2k": "",
            "magnet": "",
            "thunder": "",
            "qqdl": "",
            "ftp": "",
            "http": ""
        }
    };
}


function initUI() {
    var shadow_frame = document.querySelector(".shadow-frame");
    if (shadow_frame) {

        var bd_address_list = shadow_frame.querySelectorAll(".bd-address+td");
        for (var i = 0; i < bd_address_list.length; i++) {
            var td_el = bd_address_list[i];
            var json = getJSON(shadow_frame, td_el);
            var jsonStr = JSON.stringify(json);

            var a_el = document.createElement("a");
            a_el.classList.add("label", "label-info", "btn-clipboard");
            a_el.setAttribute("data-clipboard-text", jsonStr);
            a_el.innerText = "JSON";

            td_el.appendChild(a_el);

        }
    }
}


function getJSON(shadow_frame, td_el) {
    var json = newJSON();

    if (shadow_frame) {
        json.name = shadow_frame.querySelector("h3").innerText;

        var p_IMDb = new RegExp("IMDb链接: ([a-zA-Z0-9]*)");
        var execR = p_IMDb.exec(shadow_frame.innerHTML);
        if (execR) {
            json.IMDb = execR[1];
        }

        var p_Douban = new RegExp("movie.douban.com/subject/([0-9]*)");
        var e_Douban = p_Douban.exec(shadow_frame.innerHTML);
        if (e_Douban) {
            json.Douban = e_Douban[1];
        }
    }

    if (td_el) {
        var href_list = [];

        // ed2k
        var td_parent = td_el.parentNode;
        var bd_address_a = td_parent.querySelector(".bd-address a");
        if (bd_address_a) {
            var ed2k = getAttr(bd_address_a, "href");
            href_list.push(ed2k);
        }

        // thunder, qqdl
        var a_el_list = td_el.querySelectorAll("a");
        for (var i = 0; i < a_el_list.length; i++) {
            var a_el = a_el_list[i];
            var href = getAttr(a_el, "href");

            href_list.push(href);
        }

        json = setLinks(json, href_list);
    }
    return json;
}

function getAttr(node, attName) {
    var result = "";
    result = node.getAttribute(attName);

    return result;
}

function setLinks(json, href_list) {
    for (var i = 0; i < href_list.length; i++) {
        var href = href_list[i];
        if (stringStartWith(href, "ed2k")) {
            json.links.ed2k = href;
        }
        else if (stringStartWith(href, "magnet")) {
            json.links.magnet = href;
        }
        else if (stringStartWith(href, "thunder")) {
            json.links.thunder = href;
        }
        else if (stringStartWith(href, "qqdl")) {
            json.links.qqdl = href;
        }
        else if (stringStartWith(href, "ftp")) {
            json.links.ftp = href;
        }
        // else if (stringStartWith(href, "http")) {
        //     json.links.http = href;
        // }
    }
    return json;
}

function stringStartWith(string, strHead) {
    var reg = new RegExp("^" + strHead);
    return reg.test(string);
}

