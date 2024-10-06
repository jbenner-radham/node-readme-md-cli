import isPlainObject from 'lodash.isplainobject';
import { URL } from 'node:url';

export default class GithubUrl extends URL {
    constructor(repository) {
        // See: https://docs.npmjs.com/cli/v10/configuring-npm/package-json#repository
        if (
            typeof repository !== 'string' &&
            (!isPlainObject(repository) || (isPlainObject(repository) && typeof repository.url !== 'string'))
        ) {
            throw new TypeError('Repository must be a string or an object with a url property with a string value');
        }

        let url = '';

        if (isPlainObject(repository) && repository.url) {
            url = repository.url.replace(/^git\+/, '').replace(/\.git$/, '');
        } else if (GithubUrl.isPrefixedShortcutSyntax(repository)) {
            url = `https://github.com/${GithubUrl.unprefixShortcutSyntax(repository)}`;
        } else if (GithubUrl.isUnprefixedShortcutSyntax(repository)) {
            url = `https://github.com/${repository}`;
        }

        super(url);
    }

    is() {
        return (this.host.toLowerCase() === 'github.com');
    }

    static isPrefixedShortcutSyntax(repository = '') {
        return /^github:.+\/.+$/.test(repository);
    }

    static isUnprefixedShortcutSyntax(repository = '') {
        return /^(?!\w+:).+\/.+$/.test(repository);
    }

    static unprefixShortcutSyntax(repository = '') {
        return repository.replace(/^github:/, '');
    }
}
