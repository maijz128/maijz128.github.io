/**
 * Auther: MaiJZ
 * Date: 2017/6/9
 * Github: https://github.com/maijz128
 */


// 获得用户信息
const URL_USER = "http://api.github.com/users/{{userName}}";

// 获得用户的所有库
const URL_USER_REPOS = "http://api.github.com/users/{{userName}}/repos";


const URL_CONFIG = "config.json";
const URL_COLORS = "html/github-languages-color/colors.json";

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
    //     .then(function (json) {
    //     return json;
    // });
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
        json: {
            "login": "maijz128",
            "id": 6248618,
            "avatar_url": "https://avatars1.githubusercontent.com/u/6248618?v=3",
            "gravatar_id": "",
            "url": "https://api.github.com/users/maijz128",
            "html_url": "https://github.com/maijz128",
            "followers_url": "https://api.github.com/users/maijz128/followers",
            "following_url": "https://api.github.com/users/maijz128/following{/other_user}",
            "gists_url": "https://api.github.com/users/maijz128/gists{/gist_id}",
            "starred_url": "https://api.github.com/users/maijz128/starred{/owner}{/repo}",
            "subscriptions_url": "https://api.github.com/users/maijz128/subscriptions",
            "organizations_url": "https://api.github.com/users/maijz128/orgs",
            "repos_url": "https://api.github.com/users/maijz128/repos",
            "events_url": "https://api.github.com/users/maijz128/events{/privacy}",
            "received_events_url": "https://api.github.com/users/maijz128/received_events",
            "type": "User",
            "site_admin": false,
            "name": "MaiJZ",
            "company": "test company",
            "blog": "test blog",
            "location": "ShenZhen China",
            "email": "test email",
            "hireable": null,
            "bio": "Code Code Code Coding",
            "public_repos": 7,
            "public_gists": 0,
            "followers": 4,
            "following": 0,
            "created_at": "2013-12-23T16:44:16Z",
            "updated_at": "2017-06-09T14:02:45Z"
        }
    };
    self.app = new Vue({
        el: '#user',
        data: self.appData,
        methods: {}
    });
    const url = URL_USER.replace("{{userName}}", configJSON.userName);
    fetchJSON(url).then(function (json) {
        self.appData.json = classExtend(self.appData.json, json);
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