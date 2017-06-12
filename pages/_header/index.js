/**
 * Auther: MaiJZ
 * Date: 2017/6/13
 * Github: https://github.com/maijz128
 */


const LINKS_ID_NAME = {
    Email: "maijz128@gmail.com",
    GitHub: "maijz128",
    Twitter: "maijz128",
    Facebook: "",
    WeiBo: "",
    QQ: ""
};


if (!_g) var _g = {};

window.onload = function () {
    _g.header = new Header();
};

function Header() {
    const self = this;
    self.appData = {
        LINKS: LINKS_ID_NAME
    };
    self.app = new Vue({
        el: "#header",
        data: self.appData,
        methods: {}
    });
}