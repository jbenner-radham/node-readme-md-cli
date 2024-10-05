export default class NpmBadge {
    constructor({ pkgName = '', style = '' }) {
        this.alt = 'npm Version';
        this.image = `https://img.shields.io/npm/v/${pkgName}.svg` + (style ? `?style=${style}` : '');
        this.link = `https://www.npmjs.com/package/${pkgName}`;
    }
}
