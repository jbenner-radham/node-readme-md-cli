import isPlainObject from 'is-plain-obj';
import { URL } from 'node:url';

export type GithubUrlConfig = string
    | {
        type: string;
        url: string;
        directory?: string;
    };

export default class GithubUrl extends URL {
    constructor(repository: GithubUrlConfig) {
        // See: https://docs.npmjs.com/cli/v10/configuring-npm/package-json#repository
        if (
            typeof repository !== 'string' &&
            (!isPlainObject(repository) || (isPlainObject(repository) && typeof repository.url !== 'string'))
        ) {
            throw new TypeError('Repository must be a string or an object with a url property with a string value');
        }

        const stripGitPrefixAndSuffix = (value: string): string =>
            value.replace(/^git\+/, '').replace(/\.git$/, '');

        let url = '';

        // if (isPlainObject(repository) && (repository as { url: string; }).url) {
        if (isPlainObject(repository)) {
            url = stripGitPrefixAndSuffix(repository.url);
        } else if (GithubUrl.isPrefixedShortcutSyntax(repository)) {
            url = `https://github.com/${GithubUrl.unprefixShortcutSyntax(repository)}`;
        } else if (GithubUrl.isUnprefixedShortcutSyntax(repository)) {
            url = `https://github.com/${repository}`;
        } else {
            url = stripGitPrefixAndSuffix(repository);
        }

        super(url);
    }

    is() {
        return (this.host.toLowerCase() === 'github.com');
    }

    isValid(): boolean {
        return (
            this.host.toLowerCase() === 'github.com' &&
            this.pathname.split('/').filter(component => component !== '').length === 2
        )
    }

    static isPrefixedShortcutSyntax(repository = '') {
        return (
            repository.startsWith('github:') &&
            repository.replace(/^github:/, '').split('/').length === 2
        );
    }

    static isUnprefixedShortcutSyntax(repository = '') {
        const invalidPrefixes = ['git+', 'github:', 'http://', 'https://'];
        const hasInvalidPrefix = invalidPrefixes.some(prefix => repository.startsWith(prefix));

        if (hasInvalidPrefix) {
            return false;
        }

        return repository.split('/').length === 2;
    }

    static unprefixShortcutSyntax(repository = '') {
        return repository.replace(/^github:/, '');
    }
}
