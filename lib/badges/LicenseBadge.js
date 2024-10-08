export default class LicenseBadge {
    constructor({ githubPathname = '', link = '', style = '' }) {
        this.alt = 'License Type';
        this.image = `https://img.shields.io/github/license${githubPathname}.svg` + (style ? `?style=${style}` : '');
        this.link = link;
    }
}
