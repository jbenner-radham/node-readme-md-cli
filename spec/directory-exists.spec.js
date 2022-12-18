import directoryExists from '../lib/directory-exists.js';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const { any } = jasmine;

describe('directoryExists', function () {
    it('is a function', function () {
        expect(directoryExists).toEqual(any(Function));
    });

    it('returns a Boolean value', function () {
        expect(directoryExists()).toEqual(any(Boolean));
    });

    it('returns `true` when passed a path that does exist', function () {
        expect(directoryExists(__dirname)).toBe(true);
    });

    it('returns `false` when passed a path that does not exist', function () {
        const doesNotExist = path.resolve(`${__dirname}/path-dne`);

        expect(directoryExists(doesNotExist)).toBe(false);
    });
});
