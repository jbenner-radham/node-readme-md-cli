const isFile = require('./is-file');

module.exports = class License {
    static get filenames() {
        return ['LICENSE', 'LICENSE.md', 'LICENSE.txt'];
    }

    static getLinkTarget() {
        return License.filenames.filter(licenseFilename => {
            return isFile(`${process.cwd()}/${licenseFilename}`);
        }).shift() || '';
    }
}
