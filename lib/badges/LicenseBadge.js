export default class LicenseBadge {
    constructor(gitHubPathname, link, style) {
        this.alt = 'License';
        this.image = `https://img.shields.io/github/license${gitHubPathname}.svg`;
        this.link = link;
        this.style = style;
    }
}
