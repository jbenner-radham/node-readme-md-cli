const isFile = require('./is-file');
const path = require('path');
const pathExists = require('./path-exists');

module.exports = class License {
    static get filenames() {
        return ['LICENSE', 'LICENSE.md', 'LICENSE.txt'];
    }

    static getLinkTarget() {
        let linkTarget = '';

        for (const licenseFilename of License.filenames) {
            const licensePath = path.join(process.cwd(), licenseFilename);

            if (pathExists(licensePath) && isFile(licensePath)) {
                linkTarget = licenseFilename;
                break;
            }
        }

        return linkTarget;
    }
}
