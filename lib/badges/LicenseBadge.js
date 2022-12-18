export default class LicenseBadge {
    constructor({ githubPathname = '', link = '', style = '' }) {
        this.alt = 'License';
        this.image = `https://img.shields.io/github/license${githubPathname}.svg`;
        this.link = link;
        this.style = style;
    }
}
