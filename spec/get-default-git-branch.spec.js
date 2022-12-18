import getDefaultGitBranch from '../lib/get-default-git-branch.js';

const { any } = jasmine;

describe('getDefaultGitBranch', function () {
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
