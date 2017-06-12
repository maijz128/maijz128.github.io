/**
 * Auther: MaiJZ
 * Date: 2017/6/12
 * Github: https://github.com/maijz128
 */


const _TE_CLASS_NAME = "toggle-el-switch";
const _TE_EL_CLOSING = 'toggle-el-closing';
const _TE_ON_SHOW_HINT = "toggle-el-show-hint";
const _TE_ON_HIDE_HINT = "toggle-el-hide-hint";
const _TE_ATTR_LIST = {
    TARGET: "te-target",
    CLOSING: "te-closing"
};

// init
{
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = "." + _TE_EL_CLOSING + "{ display:none }";
    document.getElementsByTagName('HEAD').item(0).appendChild(style);
}


setInterval(function () {
    const elList = document.querySelectorAll("." + _TE_CLASS_NAME);
    const children = elList;
    for (var i = 0; i < children.length; i++) {
        const el = children[i];
        _TE_InitEL(el);
    }

}, 200);

function _TE_InitEL(el) {
    el.onclick = function () {
        _TE_OnClick(el);
        return false;
    };

    _TE_Refresh(el);
}

function _TE_OnClick(el) {
    var closing = el.getAttribute(_TE_ATTR_LIST.CLOSING);
    closing = _TE_Str2Bool(closing);

    if (closing) {
        el.setAttribute(_TE_ATTR_LIST.CLOSING, "false");
    } else {
        el.setAttribute(_TE_ATTR_LIST.CLOSING, "true");
    }
    _TE_Refresh(el);
}

function _TE_Refresh(el) {
    var targetName = el.getAttribute(_TE_ATTR_LIST.TARGET);
    var target = null;
    if (targetName) {
        targetName = targetName.replace(/#/, "");
        target = document.getElementById(targetName);
    }

    var closing = el.getAttribute(_TE_ATTR_LIST.CLOSING);
    closing = _TE_Str2Bool(closing);

    if (target) {
        _TE_Hide(target, closing);
        _TE_Refresh_Hint(el, closing);
    }
}

function _TE_Refresh_Hint(el, closing) {
    const hideHint = el.querySelector("." + _TE_ON_HIDE_HINT);
    const showHint = el.querySelector("." + _TE_ON_SHOW_HINT);
    if (closing) {
        _TE_Hide(showHint, true);
        _TE_Hide(hideHint, false);
    } else {
        _TE_Hide(showHint, false);
        _TE_Hide(hideHint, true);
    }
}

function _TE_Hide(el, closing) {
    if (el) {
        if (closing) {
            el.classList.add(_TE_EL_CLOSING);
        } else {
            el.classList.remove(_TE_EL_CLOSING);
        }
    }
}

function _TE_Str2Bool(str) {
    var result = str;
    if (result === "true") result = true;
    if (result === "false") result = false;
    return result;
}