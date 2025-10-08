import Badge from './Badge.js';

export default class NodeJsBadge extends Badge {
    constructor({ pkgName = '', style = '' }: { pkgName: string, style?: string }) {
        const alt = 'Node.js Version';
        const image = `https://img.shields.io/node/v/${pkgName}.svg` + (style ? `?style=${style}` : '');
        const link = 'https://nodejs.org/';

        super({ alt, image, link });
    }
}
