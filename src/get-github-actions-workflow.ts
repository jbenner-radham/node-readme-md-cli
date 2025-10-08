import getGithubActionsWorkflows from './get-github-actions-workflows.js';

/**
 * Get the GitHub Actions workflow filename. Either the one specified in the config or an
 * auto-detected file.
 */
export default function getGithubActionsWorkflow(config: { workflow?: string } = {}): string {
  if (config.workflow) {
    return config.workflow;
  }

  const workflows = getGithubActionsWorkflows();

  return workflows.length >= 1
    ? workflows[0]!
    : '';
}
