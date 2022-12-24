import { sync as commandExistsSync } from 'command-exists';
import path from 'node:path';
import { execaCommand, execaCommandSync } from 'execa';
import { fileURLToPath } from 'node:url';
import { temporaryDirectory } from 'tempy';
import parseJsonFile from '../../lib/parse-json-file.js';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const maybeDescribe = process.env.CI === 'true' ? describe : xdescribe;
const projectBaseDir = path.resolve(__dirname, '..', '..');
const pkg = parseJsonFile(projectBaseDir, 'package.json');
const [bin] = Object.keys(pkg.bin);
const version = pkg.version;

maybeDescribe('readme-md-cli', function () {
    beforeAll(function () {
        process.chdir(projectBaseDir);
        execaCommandSync('yarn link', { shell: true });
    });

    afterAll(function () {
        process.chdir(projectBaseDir);
        execaCommandSync(`yarn unlink ${pkg.name}`, { shell: true });
    });

    /* eslint-disable max-len */
    beforeEach(function () {
        /**
         * We had to do this on Travis-CI so I'm keeping it like this just in
         * case. I might revisit this choice later.
         *
         * @see https://docs.github.com/en/actions/learn-github-actions/environment-variables#default-environment-variables
         */
        if (process.env.CI === 'true') {
            jasmine.DEFAULT_TIMEOUT_INTERVAL = 25000;
        }
    });
    /* eslint-enable max-len */

    it('is an available system command', function () {
        expect(commandExistsSync(bin)).toBe(true);
    });

    it('writes the version number to stdout if called with the `--version` flag', function (done) {
        execaCommand(`${bin} --version`).then(output => (output.stdout === version) ? done() : done.fail())
            .catch(error => done.fail(error));
    });

    it('should exit with error code `0` if called with the `--help` flag', function (done) {
        execaCommand(`${bin} --help`).then(() => done())
            .catch(error => done.fail(error));
    });

    it('should exit with error code `0` if called with the `-h` flag', function (done) {
        execaCommand(`${bin} -h`).then(() => done())
            .catch(error => done.fail(error));
    });

    it('should exit with error code `0` if called with the `--version` flag', function (done) {
        execaCommand(`${bin} --version`).then(() => done())
            .catch(error => done.fail(error));
    });

    it('should exit with error code `0` if called with the `-v` flag', function (done) {
        execaCommand(`${bin} -v`).then(() => done())
            .catch(error => done.fail(error));
    });

    it('should exit with error code `1` if called in a directory without a `package.json` file', function (done) {
        const cwd = temporaryDirectory();

        execaCommand(bin, { cwd }).then(() => done.fail())
            .catch(error => (error.exitCode === 1) ? done() : done.fail(error));
    });
});
