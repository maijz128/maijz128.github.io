/**
 * Auther: MaiJZ
 * Date: 2017/6/13
 * Github: https://github.com/maijz128
 */

const URL_BOOKS = "books.json";


if (!_g) var _g = {};

window.onload = function () {
    _g.books = new Books();
};

function Books() {
    const self = this;
    self.appData = {
        json: [{
            "category": "改善代码",
            "closing": true,
            "books": [
                {
                    "title": "重构：改善既有代码的设计",
                    "title_en": "Refactoring: Improving the Design of Existing Code",
                    "pviews": "1",
                    "links": {
                        "douban": "https://book.douban.com/subject/4262627/"
                    }
                }
            ]
        }]
    };
    self.app = new Vue({
        el: '#books-container',
        data: self.appData,
        methods: {
            getDoubanURL: function (book) {
                if (book.links.douban) {
                    return "https://book.douban.com/subject/" + book.links.douban;
                } else {
                    return "javascript:void(0);";
                }
            }
        }
    });

    self.appData.json = Data_Books;

    //
    // fetch(URL_BOOKS).then(function (response) {
    //     return response.json();
    // }).then(function (json) {
    //     self.appData.json = json;
    // });
}