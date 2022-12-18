export default class NpmBadge {
    constructor({ pkgName = '', style = '' }) {
        this.alt = 'npm';
        this.image = `https://img.shields.io/npm/v/${pkgName}.svg`;
        this.link = `https://www.npmjs.com/package/${pkgName}`;
        this.style = style;
    }
}
