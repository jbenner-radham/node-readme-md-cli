import getGithubActionsWorkflows from '../../lib/get-github-actions-workflows.js';

const { any } = jasmine;
const maybeDescribe = process.env.CI !== 'true' ? describe : xdescribe;

/**
 * @todo Investigate why this doesn't work on GitHub Actions and fix it.
 */
maybeDescribe('getGithubActionsWorkflows', function () {
    it('is a function', function () {
        expect(getGithubActionsWorkflows).toEqual(any(Function));
    });

    it('returns ["ci.yaml"] for this repo', function () {
        expect(getGithubActionsWorkflows()).toEqual(['ci.yaml']);
    });

    it('returns an array', function () {
        expect(getGithubActionsWorkflows()).toEqual(any(Array));
    });
});
