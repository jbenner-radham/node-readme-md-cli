import getDefaultGitBranch from '../../lib/get-default-git-branch.js';

const { any } = jasmine;
const maybeDescribe = process.env.CI !== 'true' ? describe : xdescribe;

/**
 * @todo Investigate why this doesn't work on GitHub Actions and fix it.
 */
maybeDescribe('getDefaultGitBranch', function () {
    it('is a function', function () {
        expect(getDefaultGitBranch).toEqual(any(Function));
    });

    it('returns "main" for this repo', function () {
        expect(getDefaultGitBranch()).toEqual('main');
    });

    it('returns a string', function () {
        expect(getDefaultGitBranch()).toEqual(any(String));
    });
});
