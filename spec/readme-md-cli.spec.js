import { sync as commandExistsSync } from 'command-exists';
import path from 'node:path';
import execa from 'execa';
import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import tempy from 'tempy';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const _describe = process.env.TRAVIS ? describe : xdescribe;
const pkg = JSON.parse(fs.readFileSync(`${process.cwd()}/package.json`).toString());
const [bin] = Object.keys(pkg.bin);
const version = pkg.version;

_describe('readme-md-cli', function () {
    beforeAll(function () {
        process.chdir(__dirname);
        execa.commandSync('yarn link', { shell: true });
    });

    afterAll(function () {
        process.chdir(__dirname);
        execa.commandSync(`yarn unlink ${pkg.name}`, { shell: true });
    });

    beforeEach(function () {
        /**
         * Sometimes the builds run slow on Travis-CI so crank up the timeout
         * just in case.
         *
         * @see https://docs.travis-ci.com/user/environment-variables#Default-Environment-Variables
         */
        if (process.env.TRAVIS === 'true') {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 25000;
        }
    });

    it('is an available system command', function () {
        expect(commandExistsSync(bin)).toBe(true);
    });

    it('writes the version number to stdout if called with the `--version` flag', function (done) {
        execa.command(`${bin} --version`).then(output => (output.stdout === version) ? done() : done.fail())
            .catch(error => done.fail(error));
    });

    it('should exit with error code `0` if called with the `--help` flag', function (done) {
        execa.command(`${bin} --help`).then(() => done())
            .catch(error => done.fail(error));
    });

    it('should exit with error code `0` if called with the `-h` flag', function (done) {
        execa.command(`${bin} -h`).then(() => done())
            .catch(error => done.fail(error));
    });

    it('should exit with error code `0` if called with the `--version` flag', function (done) {
        execa.command(`${bin} --version`).then(() => done())
            .catch(error => done.fail(error));
    });

    it('should exit with error code `0` if called with the `-v` flag', function (done) {
        execa.command(`${bin} -v`).then(() => done())
            .catch(error => done.fail(error));
    });

    it('should exit with error code `1` if called in a directory without a `package.json` file', function (done) {
        const cwd = tempy.directory();

        execa.command(bin, { cwd }).then(() => done.fail())
            .catch(error => (error.exitCode === 1) ? done() : done.fail(error));
    });
});
