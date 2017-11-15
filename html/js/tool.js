/**
 * Auther: MaiJZ
 * Date: 2017/6/14
 * Github: https://github.com/maijz128
 */

document.ready = function (callback) {
    ///兼容FF,Google
    if (document.addEventListener) {
        document.addEventListener('DOMContentLoaded', function () {
            document.removeEventListener('DOMContentLoaded', arguments.callee, false);
            callback();
        }, false)
    }
    //兼容IE
    else if (document.attachEvent) {
        document.attachEvent('onreadystatechange', function () {
            if (document.readyState == "complete") {
                document.detachEvent("onreadystatechange", arguments.callee);
                callback();
            }
        })
    }
    else if (document.lastChild == document.body) {
        callback();
    }
};

function classExtend(source, target) {
    var self = source;
    for (var att in target) {
        self[att] = target[att];
    }
    return source;
}
function classCombine(source, target) {
    var self = source;
    for (var att in target) {
        self[att] = target[att] || self[att];
    }
    return source;
}


function fetchJSON(url) {
    return fetch(url).then(function (response) {
        return response.json();
    });
}

function fetchHtml(url) {
    return fetch(url).then(function (response) {
        return response.text()
    }).then(function (text) {
        return text;
    }).catch(function (err) {
        console.error(err)
    });
}

// htmlLoader("/pages/header/index.html", "#header-content");
function htmlLoader(url, containerSelector) {
    fetchHtml(url).then(function (html) {
        var container = document.querySelector(containerSelector);
        if (container) {
            container.innerHTML = html;
        }
    });
}