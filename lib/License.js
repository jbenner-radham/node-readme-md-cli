import isFileInCwd from 'is-file-in-cwd';

export default class License {
    static get filenames() {
        return ['LICENSE', 'LICENSE.md', 'LICENSE.rst', 'LICENSE.txt'];
    }

    static getLinkTarget() {
        return License.filenames.filter(isFileInCwd).shift() || '';
    }
}
