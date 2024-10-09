import { sync as commandExistsSync } from 'command-exists';
import { execa, execaSync } from 'execa';
import { fileURLToPath } from 'node:url';
import parseJsonFile from '../../lib/parse-json-file.js';
import path from 'node:path';
import process from 'node:process';
import { temporaryDirectory } from 'tempy';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const maybeDescribe = process.env.CI === 'true' ? describe : xdescribe;
const projectBaseDir = path.resolve(__dirname, '..', '..');
const pkg = parseJsonFile(projectBaseDir, 'package.json');
const [bin] = Object.keys(pkg.bin);
const { version } = pkg;

maybeDescribe('readme-md-cli', function () {
    beforeAll(function () {
        process.chdir(projectBaseDir);
        execaSync('yarn', ['link'], { shell: true });
    });

    afterAll(function () {
        process.chdir(projectBaseDir);
        execaSync('yarn', ['unlink', pkg.name], { shell: true });
    });

    beforeEach(function () {
        /**
         * We had to do this on Travis-CI, so I'm keeping it like this just in case. I might revisit this choice later.
         *
         * @see {@link https://docs.github.com/en/actions/learn-github-actions/environment-variables#default-environment-variables}
         */
        if (process.env.CI === 'true') {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 25000;
        }
    });

    it('is an available system command', function () {
        expect(commandExistsSync(bin)).toBe(true);
    });

    it('writes the version number to stdout if called with the `--version` flag', function (done) {
        execa(bin, ['--version'])
            .then(result => (result.stdout === version) ? done() : done.fail())
            .catch(error => done.fail(error));
    });

    it('should exit with error code `0` if called with the `--help` flag', function (done) {
        execa(bin, ['--help'])
            .then(() => done())
            .catch(error => done.fail(error));
    });

    it('should exit with error code `0` if called with the `-h` flag', function (done) {
        execa(bin, ['-h'])
            .then(() => done())
            .catch(error => done.fail(error));
    });

    it('should exit with error code `0` if called with the `--version` flag', function (done) {
        execa(bin, ['--version'])
            .then(() => done())
            .catch(error => done.fail(error));
    });

    it('should exit with error code `0` if called with the `-v` flag', function (done) {
        execa(bin, ['-v'])
            .then(() => done())
            .catch(error => done.fail(error));
    });

    it('should exit with error code `1` if called in a directory without a `package.json` file', function (done) {
        const cwd = temporaryDirectory();

        execa(bin, [], { cwd })
            .then(() => done.fail())
            .catch(error => (error.exitCode === 1) ? done() : done.fail(error));
    });
});
