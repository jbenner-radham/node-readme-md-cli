import { afterAll, beforeAll, beforeEach, describe, expect, it } from 'vitest';
import { sync as commandExistsSync } from 'command-exists';
import { execa, execaSync } from 'execa';
import { fileURLToPath } from 'node:url';
import parseJsonFile from '../../lib/parse-json-file.js';
import path from 'node:path';
import process from 'node:process';
import { temporaryDirectory } from 'tempy';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectBaseDir = path.resolve(__dirname, '..', '..');
const pkg = parseJsonFile(projectBaseDir, 'package.json');
const [bin] = Object.keys(pkg.bin);
const { version } = pkg;

describe.runIf(process.env.CI === 'true')('readme-md-cli', () => {
    beforeAll(() => {
        process.chdir(projectBaseDir);
        // execaSync('npm', ['link'], { shell: true });

        // NOTE: pnpm link does not work on GH Actions on Windows.
        execaSync('pnpm', ['link'], { shell: true });
    });

    afterAll(() => {
        process.chdir(projectBaseDir);
        // execaSync('npm', ['unlink', '-g', pkg.name], { shell: true });
        execaSync('pnpm', ['unlink', pkg.name], { shell: true });
    });

    beforeEach(() => {
        /**
         * We had to do this on Travis-CI, so I'm keeping it like this just in case. I might revisit this choice later.
         *
         * @see {@link https://docs.github.com/en/actions/learn-github-actions/environment-variables#default-environment-variables}
         */
        // if (process.env.CI === 'true') {
        //     jasmine.DEFAULT_TIMEOUT_INTERVAL = 25000;
        // }
    });

    it('is an available system command', () => {
        expect(commandExistsSync(bin)).toBe(true);
    });

    it('writes the version number to stdout if called with the `--version` flag', async () => {
        expect((await execa(bin, ['--version'])).stdout).toEqual(version);
    });

    it('should exit with error code `0` if called with the `--help` flag', async () => {
        await expect(execa(bin, ['--help'])).resolves.toBeDefined();
    });

    it('should exit with error code `0` if called with the `-h` flag', async () => {
        await expect(execa(bin, ['--help'])).resolves.toBeDefined();
    });

    it('should exit with error code `0` if called with the `--version` flag', async () => {
        await expect(execa(bin, ['--version'])).resolves.toBeDefined();
    });

    it('should exit with error code `0` if called with the `-v` flag', async () => {
        await expect(execa(bin, ['-v'])).resolves.toBeDefined();
    });

    it('should exit with error code `1` if called in a directory without a `package.json` file', async () => {
        const cwd = temporaryDirectory();

        await (expect(execa(bin, [], { cwd }))).rejects.toThrowError();
    });
});
