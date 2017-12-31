const {URL} = require('url');

module.exports = class GitHubUrl {
    constructor(url) {
        const frontCleanedUrl = url.replace(/^git\+/, '');
        const rearCleanedUrl = frontCleanedUrl.replace(/\.git$/, '');
        this.url = new URL(rearCleanedUrl);
    }

    is() {
        return (this.url.host == 'github.com');
    }
};
