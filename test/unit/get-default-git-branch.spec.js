import { describe, expect, it } from 'vitest';
import getDefaultGitBranch from '../../lib/get-default-git-branch.js';

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
