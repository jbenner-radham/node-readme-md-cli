import getDefaultGitBranch from '../../src/get-default-git-branch.js';
import { describe, expect, it } from 'vitest';

/**
 * @todo Investigate why this doesn't work on GitHub Actions and fix it.
 */
describe.skipIf(process.env.CI === 'true')('getDefaultGitBranch', () => {
  it('is a function', () => {
    expect(getDefaultGitBranch).toBeTypeOf('function');
  });

  it('returns "main" for this repo', () => {
    expect(getDefaultGitBranch()).toEqual('main');
  });

  it('returns a string', () => {
    expect(getDefaultGitBranch()).toBeTypeOf('string');
  });
});
