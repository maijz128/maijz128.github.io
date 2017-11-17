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
                if (r_list.length > 0) name = r_list[1];

                var url = "";
                const url_IMDb = "http://www.imdb.com/title/" + movie.IMDb;
                const url_douban_search = "https://www.douban.com/search?cat=1002&q=" + name;
                const url_douban = "https://movie.douban.com/subject/" + movie.Douban;
                if (movie.Douban) {
                    url = url_douban;
                } else {
                    url = url_douban_search;
                }
                window.open(url);
            }
        }
    });


        self.appData.json = Data_Movies;
}