module.exports = class LicenseBadge {
    constructor(gitHubPathname, link, style) {
        this.name = 'license';
        this.image = `https://img.shields.io/github/license${gitHubPathname}.svg`;
        this.link = link;
        this.style = style;
    }
};
