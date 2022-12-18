export default class NodeJsBadge {
    constructor({ pkgName = '', style = '' }) {
        this.alt = 'Node.js';
        this.image = `https://img.shields.io/node/v/${pkgName}.svg`;
        this.link = 'https://nodejs.org/';
        this.style = style;
    }
}
