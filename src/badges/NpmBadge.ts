import Badge from './Badge.js';

export default class NpmBadge extends Badge {
  constructor({ pkgName, style }: { pkgName: string; style?: string }) {
    const alt = 'npm Version';
    const image = `https://img.shields.io/npm/v/${pkgName}.svg` + (style ? `?style=${style}` : '');
    const link = `https://www.npmjs.com/package/${pkgName}`;

    super({ alt, image, link });
  }
}
