import getGithubWorkflows from '../../lib/get-github-workflows.js';

const { any } = jasmine;

describe('getGithubWorkflows', function () {
    it('is a function', function () {
        expect(getGithubWorkflows).toEqual(any(Function));
    });

    it('returns ["ci.yaml"] for this repo', function () {
        expect(getGithubWorkflows()).toEqual(['ci.yaml']);
    });

    it('returns an array', function () {
        expect(getGithubWorkflows()).toEqual(any(Array));
    });
});
