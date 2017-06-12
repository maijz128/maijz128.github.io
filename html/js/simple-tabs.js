/**
 * Auther: MaiJZ
 * Date: 2017/6/12
 * Github: https://github.com/maijz128
 */

/**
 * Example

     <ul class="st-nav-tabs">
         <li>
            <a class="st-nav-tab" href="javascript:void();"
            st-target="pane1" st-active="true">Pane1</a>
         </li>
         <li>
            <a class="st-nav-tab" href="javascript:void();"
            st-target="pane2">Pane2</a>
         </li>
     </ul>

    <div id="pane1">
        pane1 content
    <div>
    <div id="pane2">
        pane2 content
    <div>
 */


const _NAV_TABS_CLASS_NAME = "st-nav-tabs";
const _NAV_TAB_CLASS_NAME = "st-nav-tab";
const _ST_PANE_HIDE_CLASS_NAME = "st-pane-hide";
const _ST_ATTR_LIST = {
    TARGET: "st-target",
    ACTIVE: "st-active"
};

// init
{
    const style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = "." + _ST_PANE_HIDE_CLASS_NAME + "{ display:none }";
    document.getElementsByTagName('HEAD').item(0).appendChild(style);
}


setInterval(function () {
    const tabsList = document.querySelectorAll("." + _NAV_TABS_CLASS_NAME);
    const children = tabsList;
    for (var i = 0; i < children.length; i++) {
        const el = children[i];
        _ST_Check_Tabs(el);
    }
}, 200);

function _ST_Check_Tabs(tabsParent) {
    const children = tabsParent.querySelectorAll("." + _NAV_TAB_CLASS_NAME);
    for (var i = 0; i < children.length; i++) {
        const el = children[i];

        el.onclick = function () {
            _ST_OnClick(el, tabsParent);
            return false;
        };

        _ST_Refresh(el);
    }
}

function _ST_OnClick(tab, tabsParent) {
    _ST_All_Hide(tabsParent);

    tab.setAttribute(_ST_ATTR_LIST.ACTIVE, true);
}

function _ST_All_Hide(tabsParent) {
    const children = tabsParent.querySelectorAll("." + _NAV_TAB_CLASS_NAME);
    for (var i = 0; i < children.length; i++) {
        const el = children[i];
        el.setAttribute(_ST_ATTR_LIST.ACTIVE, false);
    }
}

function _ST_Refresh(tab) {
    var targetName = tab.getAttribute(_ST_ATTR_LIST.TARGET);
    var target = null;
    if (targetName) {
        targetName = targetName.replace(/#/, "");
        target = document.getElementById(targetName);
    }

    var active = tab.getAttribute(_ST_ATTR_LIST.ACTIVE);
    active = _ST_Str2Bool(active);

    if (target) {
        if (active) {
            target.classList.remove(_ST_PANE_HIDE_CLASS_NAME);
        } else {
            target.classList.add(_ST_PANE_HIDE_CLASS_NAME);
        }
    }
}


function _ST_Str2Bool(str) {
    var result = str;
    if (result === "true") result = true;
    if (result === "false") result = false;
    return result;
}