import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { execaSync } from 'execa';
import { fileURLToPath } from 'node:url';
import parseJsonFile from '../../src/parse-json-file.js';
import path from 'node:path';
import process from 'node:process';
import { temporaryDirectory } from 'tempy';
import type { PackageJson } from 'type-fest';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectBaseDir = path.resolve(__dirname, '..', '..');
const pkg = parseJsonFile(projectBaseDir, 'package.json') as PackageJson;
const [bin] = Object.keys(pkg.bin as Record<string, string>);
const { version } = pkg;
const pnpmHome = path.resolve(projectBaseDir, '.pnpm');

const exec = (command: string, args: string[], { cwd = projectBaseDir }: { cwd?: string } = {}) => {
    const env = {
        ...process.env,
        PNPM_HOME: pnpmHome,
        PATH: process.env.PATH ? `${process.env.PATH}:${pnpmHome}` : pnpmHome
    };

    return execaSync(command, args, { cwd, env, shell: true });
}

// https://docs.github.com/en/actions/learn-github-actions/environment-variables#default-environment-variables
const IS_CI = process.env.CI === 'true';

describe.runIf(IS_CI)('readme-md-cli', () => {
    beforeAll(() => {
        process.chdir(projectBaseDir);
        exec('pnpm', ['run', 'build']);
        exec('pnpm', ['link']);
    });

    afterAll(() => {
        process.chdir(projectBaseDir);
        exec('pnpm', ['unlink', pkg.name!]);
    });

    it('is an available system command', () => {
        expect(exec('command', ['-v', bin!]).stdout.endsWith(bin!)).toBe(true);
    });

    it('writes the version number to stdout if called with the `--version` flag', () => {
        expect(exec(bin!, ['--version']).stdout).toEqual(version);
    });

    it('should exit with error code `0` if called with the `--help` flag', () => {
        expect(exec(bin!, ['--help']).stdout).toBeDefined();
    });

    it('should exit with error code `0` if called with the `-h` flag', () => {
        expect(exec(bin!, ['-h']).stdout).toBeDefined();
    });

    it('should exit with error code `0` if called with the `--version` flag', () => {
        expect(exec(bin!, ['--version']).stdout).toBeDefined();
    });

    it('should exit with error code `0` if called with the `-v` flag', () => {
        expect(exec(bin!, ['-v']).stdout).toBeDefined();
    });

    it('should exit with error code `1` if called in a directory without a `package.json` file', () => {
        const cwd = temporaryDirectory();

        expect(() => exec(bin!, [], { cwd })).toThrowError();
    });
});
