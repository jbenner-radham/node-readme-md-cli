export default class TravisCiBadge {
    constructor(gitHubPathname, style) {
        this.alt = 'build';
        this.image = `https://img.shields.io/travis${gitHubPathname}.svg`;
        this.link = `https://travis-ci.org${gitHubPathname}`;
        this.style = style;
    }
}
