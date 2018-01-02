module.exports = class NodeJsBadge {
    constructor(pkgName, style) {
        this.name = 'node.js';
        this.image = `https://img.shields.io/node/v/${pkgName}.svg`;
        this.link = 'https://nodejs.org/';
        this.style = style;
    }
};
