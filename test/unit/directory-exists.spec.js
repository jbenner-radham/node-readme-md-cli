import directoryExists from '../../lib/directory-exists.js';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { describe, expect, it } from 'vitest';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('directoryExists', () => {
    it('is a function', () => {
        expect(directoryExists).toBeTypeOf('function');
    });

    it('returns a Boolean value', () => {
        expect(directoryExists()).toBeTypeOf('boolean');
    });

    it('returns `true` when passed a path that does exist', () => {
        expect(directoryExists(__dirname)).toBe(true);
    });

    it('returns `false` when passed a path that does not exist', () => {
        const doesNotExist = path.resolve(`${__dirname}/path-dne`);

        expect(directoryExists(doesNotExist)).toBe(false);
    });
});
