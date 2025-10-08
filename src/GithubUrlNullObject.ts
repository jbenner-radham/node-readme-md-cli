export default class GithubUrlNullObject {
    hash = '';

    host = '';

    hostname = '';

    href = '';

    readonly origin = '';

    password = '';

    pathname = '/';

    port = '';

    protocol = '';

    search = '';

    readonly searchParams = new URLSearchParams();

    username = '';

    is() {
        return false;
    }

    isValid(): boolean {
        return false;
    }

    toJSON(): string {
        return '';
    }
}
