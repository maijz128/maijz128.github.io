/**
 * Auther: MaiJZ
 * Date: 2017/6/14
 * Github: https://github.com/maijz128
 */

const URL_MOVIES = "movies.json";


if (!_g) var _g = {};

window.onload = function () {
    _g.movies = new Movies();
};

function Movies() {
    const self = this;
    self.appData = {
        json: [{
            "category": "More",
            "closing": true,
            "movies": [
                {
                    "name": "",
                    "IMDb": "",
                    "links": {
                        "ed2k": "",
                        "magnet": "",
                        "thunder": "",
                        "qqdl": ""
                    }
                }
            ]
        }]
    };
    self.app = new Vue({
        el: '#movies-container',
        data: self.appData,
        methods: {
            profile: function (movie) {
                var name = movie.name;
                var r_list = name.match("《(.*?)》");
                if(r_list.length > 0) name = r_list[1];

                const url_IMDb = "http://www.imdb.com/title/" + movie.IMDb;
                const url_douban = "https://www.douban.com/search?cat=1002&q=" + name;
                window.open(url_douban);
            }
        }
    });


    fetch(URL_MOVIES).then(function (response) {
        return response.json();
    }).then(function (json) {
        self.appData.json = json;
    });
}