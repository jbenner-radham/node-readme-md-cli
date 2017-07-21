'use strict';

const any = jasmine.any;
const commandExistsSync = require('command-exists').sync;
const exec = require('util').promisify(require('child_process').exec);
const fs = require('fs-extra');
const pkg = require('../package.json');
const tempy = require('tempy');

const bin = Object.keys(pkg.bin).shift();
const version = pkg.version;

describe('readme-md-cli', function () {
    it('is an available system command', function () {
        expect(commandExistsSync(bin)).toBe(true);
    });

    it('writes the version number to stdout if called with the `--version` flag', function (done) {
        exec(`${bin} --version`).then(output => (output.stdout.trim() === version) ? done() : done.fail())
            .catch(() => done.fail());
    });

    it('should exit with error code `0` if called with the `--help` flag', function (done) {
        exec(`${bin} --help`).then(() => done())
            .catch(() => done.fail());
    });

    it('should exit with error code `0` if called with the `-h` flag', function (done) {
        exec(`${bin} -h`).then(() => done())
            .catch(() => done.fail());
    });

    it('should exit with error code `0` if called with the `--version` flag', function (done) {
        exec(`${bin} --version`).then(() => done())
            .catch(() => done.fail());
    });

    it('should exit with error code `0` if called with the `-v` flag', function (done) {
        exec(`${bin} -v`).then(() => done())
            .catch(() => done.fail());
    });

    it('should exit with error code `1` if called in a directory without a `package.json` file', function (done) {
        const cwd = tempy.directory();

        exec(bin, {cwd}).then(() => done.fail())
            .catch((error) => (error.code === 1) ? done() : done.fail());
    });
});
