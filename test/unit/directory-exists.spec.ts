import directoryExists from '../../src/directory-exists.js';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

describe('directoryExists', () => {
  it('is a function', () => {
    expect(directoryExists).toBeTypeOf('function');
  });

  it('returns a Boolean value', () => {
    expect(directoryExists(__dirname)).toBeTypeOf('boolean');
  });

  it('returns `true` when passed a path that does exist', () => {
    expect(directoryExists(__dirname)).toBe(true);
  });

  it('returns `false` when passed a path that does not exist', () => {
    const doesNotExist = path.resolve(`${__dirname}/path-dne`);

    expect(directoryExists(doesNotExist)).toBe(false);
  });
});
