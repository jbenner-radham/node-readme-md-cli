export default class NodeJsBadge {
    constructor({ pkgName = '', style = '' }) {
        this.alt = 'Node.js Version';
        this.image = `https://img.shields.io/node/v/${pkgName}.svg` + (style ? `?style=${style}` : '');
        this.link = 'https://nodejs.org/';
    }
}
