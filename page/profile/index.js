/**
 * Auther: MaiJZ
 * Date: 2017/6/9
 * Github: https://github.com/maijz128
 */


// 获得用户信息
const URL_USER = "https://api.github.com/users/{{userName}}";

// 获得用户的所有库
const URL_USER_REPOS = "https://api.github.com/users/{{userName}}/repos";


const URL_CONFIG = "/page/profile/profile.json";


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

document.ready(function () {
    _g.languageColors = new LanguageColors();

    const json = Data_Profile;
    _g.projects = new Projects(json, _g.languageColors);
    _g.user = new User(json);
});


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
