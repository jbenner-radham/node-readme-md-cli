import Badge from './Badge.js';

export default class LicenseBadge extends Badge {
    constructor({ githubPathname = '', link = '', style = '' }) {
        // this.alt = 'License Type';
        // this.image = `https://img.shields.io/github/license${githubPathname}.svg` + (style ? `?style=${style}` : '');
        // this.link = link;
        const alt = 'License Type';
        const image = `https://img.shields.io/github/license${githubPathname}.svg` + (style ? `?style=${style}` : '');

        super({ alt, image, link });
    }
}
