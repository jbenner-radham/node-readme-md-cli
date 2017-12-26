const isFile = require('./is-file');

const isFileInCwd = (filename) => isFile(`${process.cwd()}/${filename}`);

module.exports = class License {
    static get filenames() {
        return ['LICENSE', 'LICENSE.md', 'LICENSE.txt'];
    }

    static getLinkTarget() {
        return License.filenames.filter(isFileInCwd).shift() || '';
    }
}
