const {URL} = require('url');

module.exports = class GitHubUrl extends URL {
    constructor(url) {
        const frontCleanedUrl = url.replace(/^git\+/, '');
        const rearCleanedUrl = frontCleanedUrl.replace(/\.git$/, '');
        super(rearCleanedUrl);
    }

    is() {
        return (this.host == 'github.com');
    }
};
