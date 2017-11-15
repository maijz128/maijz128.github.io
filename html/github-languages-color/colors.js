/**
 * Auther: MaiJZ
 * Date: 2017/6/15
 * Github: https://github.com/maijz128
 */

// 引用 https://github.com/ozh/github-colors
const URL_COLORS = "/html/github-languages-color/colors.json";

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
