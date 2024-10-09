import fs from 'node:fs';
import path from 'node:path';

export default function getGithubActionsWorkflows() {
    const workflowsPath = path.resolve(process.cwd(), '.github', 'workflows');

    if (!fs.existsSync(workflowsPath)) {
        return [];
    }

    const workflowPaths = fs.readdirSync(workflowsPath, { withFileTypes: true })
        .filter(workflowPath => workflowPath.isFile())
        .filter(workflowPath => workflowPath.name.endsWith('.yaml') || workflowPath.name.endsWith('.yml'));
    const workflows = workflowPaths.map(workflowPath => path.basename(workflowPath.name));

    return workflows;
}
