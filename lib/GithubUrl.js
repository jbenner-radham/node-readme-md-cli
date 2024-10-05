import { URL } from 'node:url';

export default class GithubUrl extends URL {
    constructor(url) {
        const frontCleanedUrl = url.replace(/^git\+/, '');
        const cleanedUrl = frontCleanedUrl.replace(/\.git$/, '');

        super(cleanedUrl);
    }

    is() {
        return (this.host.toLowerCase() === 'github.com');
    }
}
