'use strict';

const isFileInCwd = require('is-file-in-cwd');

module.exports = class License {
    static get filenames() {
        return ['LICENSE', 'LICENSE.md', 'LICENSE.txt'];
    }

    static getLinkTarget() {
        return License.filenames.filter(isFileInCwd).shift() || '';
    }
}
