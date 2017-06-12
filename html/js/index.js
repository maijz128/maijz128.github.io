/**
 * Auther: MaiJZ
 * Date: 2017/6/9
 * Github: https://github.com/maijz128
 */


// 获得用户信息
const URL_USER = "https://api.github.com/users/{{userName}}";

// 获得用户的所有库
const URL_USER_REPOS = "https://api.github.com/users/{{userName}}/repos";


const URL_CONFIG = "config.json";

// 引用 https://github.com/ozh/github-colors
const URL_COLORS = "html/github-languages-color/colors.json";


const USER_JSON = {
    "login": "maijz128",
    "id": 6248618,
    "avatar_url": "https://avatars1.githubusercontent.com/u/6248618?v=3",
    "url": "https://api.github.com/users/maijz128",
    "html_url": "https://github.com/maijz128",
    "name": "MaiJZ",
    "company": "",
    "blog": "",
    "location": "ShenZhen / China",
    "email": "maijz128@gmail.com",
};

const _g = {};

window.onload = function () {
    _g.languageColors = new LanguageColors();

    fetchJSON(URL_CONFIG).then(function (json) {
        _g.projects = new Projects(json, _g.languageColors);
        _g.user = new User(json);
    });
};


function fetchJSON(url) {
    return fetch(url).then(function (response) {
        return response.json();
    });
}

function LanguageColors() {
    const self = this;
    self.colors = {};

    fetchJSON(URL_COLORS).then(function (json) {
        self.colors = json;
    });
}
LanguageColors.prototype.getColor = function (languageName) {
    var color = "";
    const lColor = this.colors[languageName];
    if (lColor) {
        color = lColor.color;
    }
    return color;
};


function Projects(configJSON, languageColors) {
    const self = this;
    self.languageColors = languageColors;
    self.appData = {
        projects: configJSON.projects,
        repoDict: {}
    };
    self.app = new Vue({
        el: '#projects',
        data: self.appData,
        methods: {
            getRepos: function (repoNames) {
                const list = [];
                for (var i = 0; i < repoNames.length; i++) {
                    const name = repoNames[i];
                    const item = self.appData.repoDict[name];
                    if (item) {
                        list.push(item);
                    }
                }
                return list;
            },
            getLanguageColor: function (repo) {
                const languageName = repo.language;
                const color = self.languageColors.getColor(languageName);
                return {
                    backgroundColor: color
                }
            }
        }
    });


    const url = URL_USER_REPOS.replace("{{userName}}", configJSON.userName);
    fetchJSON(url).then(function (json) {
        const repoDict = {};
        for (var i = 0; i < json.length; i++) {
            var repoName = json[i].name;
            repoDict[repoName] = json[i];
        }
        self.appData.repoDict = repoDict;
    });
}


function User(configJSON) {
    const self = this;
    self.appData = {
        isShowOrganizations: false,
        json: USER_JSON
    };
    self.app = new Vue({
        el: '#user',
        data: self.appData,
        methods: {}
    });
    const url = URL_USER.replace("{{userName}}", configJSON.userName);
    fetchJSON(url).then(function (json) {
        self.appData.json = classCombine(self.appData.json, json);
    });
}


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