'use strict';

const commandExistsSync = require('command-exists').sync;
const pkg = require('../package.json');
const { shell, shellSync } = require('execa');
const tempy = require('tempy');

const bin = Object.keys(pkg.bin).shift();
const version = pkg.version;

describe('readme-md-cli', function () {
    beforeAll(function () {
        shellSync('yarn link');
    });

    afterAll(function () {
        shellSync(`yarn unlink ${pkg.name}`);
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
        shell(`${bin} --version`).then(output => (output.stdout === version) ? done() : done.fail())
            .catch(() => done.fail());
    });

    it('should exit with error code `0` if called with the `--help` flag', function (done) {
        shell(`${bin} --help`).then(() => done())
            .catch(() => done.fail());
    });

    it('should exit with error code `0` if called with the `-h` flag', function (done) {
        shell(`${bin} -h`).then(() => done())
            .catch(() => done.fail());
    });

    it('should exit with error code `0` if called with the `--version` flag', function (done) {
        shell(`${bin} --version`).then(() => done())
            .catch(() => done.fail());
    });

    it('should exit with error code `0` if called with the `-v` flag', function (done) {
        shell(`${bin} -v`).then(() => done())
            .catch(() => done.fail());
    });

    it('should exit with error code `1` if called in a directory without a `package.json` file', function (done) {
        const cwd = tempy.directory();

        shell(bin, { cwd }).then(() => done.fail())
            .catch(error => (error.code === 1) ? done() : done.fail());
    });
});
