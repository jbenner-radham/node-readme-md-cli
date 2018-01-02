module.exports = class NodeJsBadge {
    constructor(gitHubPathname, style) {
        this.name = 'travis-ci';
        this.image = `https://img.shields.io/travis${gitHubPathname}.svg`;
        this.link = `https://travis-ci.org${gitHubPathname}`;
        this.style = style;
    }
};
