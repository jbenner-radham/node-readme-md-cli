import { describe, expect, it } from 'vitest';
import getGithubActionsWorkflows from '../../lib/get-github-actions-workflows.js';

/**
 * @todo Investigate why this doesn't work on GitHub Actions and fix it.
 */
describe.skipIf(process.env.CI === 'true')('getGithubActionsWorkflows', () => {
    it('is a function', () => {
        expect(getGithubActionsWorkflows).toBeTypeOf('function');
    });

    it('returns an array', () => {
        expect(getGithubActionsWorkflows()).toBeInstanceOf(Array);
    });

    it('returns ["ci.yaml"] for this repo', () => {
        expect(getGithubActionsWorkflows()).toEqual(['ci.yaml']);
    });
});
