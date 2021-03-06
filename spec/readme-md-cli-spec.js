'use strict';

const commandExistsSync = require('command-exists').sync;
const pkg = require('../package.json');
const execa = require('execa');
const tempy = require('tempy');

const _describe = process.env.TRAVIS ? describe : xdescribe;
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
