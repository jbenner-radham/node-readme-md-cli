import loadConfigTemplate from '../../src/load-config-template.js';
import { temporaryDirectory } from 'tempy';
import { afterAll, beforeEach, describe, expect, it } from 'vitest';

const originalCwd = process.cwd();

describe('loadConfigTemplate', () => {
  beforeEach(() => {
    process.chdir(temporaryDirectory());
  });

  afterAll(() => {
    process.chdir(originalCwd);
  });

  it('is a function', () => {
    expect(loadConfigTemplate).toBeTypeOf('function');
  });

  it('returns a string', () => {
    expect(loadConfigTemplate()).toBeTypeOf('string');
  });
});
