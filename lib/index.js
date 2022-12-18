import attempt from './attempt.js';
import attemptInstantiation from './attempt-instantiation.js';
import fs from 'node:fs';
import get from 'lodash.get';
import getDefaultGitBranch from './get-default-git-branch.js';
import getGithubWorkflows from './get-github-workflows.js';
import GithubActionsBadge from './badges/GithubActionsBadge.js';
import GithubUrl from './GithubUrl.js';
import GithubUrlNullObject from './GithubUrlNullObject.js';
import License from './License.js';
import LicenseBadge from './badges/LicenseBadge.js';
import NodeJsBadge from './badges/NodeJsBadge.js';
import NpmBadge from './badges/NpmBadge.js';
import path from 'node:path';
import readme from 'readme-md';
import result from 'lodash.result';
import SeeAlsoSection from './sections/SeeAlsoSection.js';
import UsageSection from './sections/UsageSection.js';
import yarnLockfileExists from 'yarn-lockfile-exists';

const readFile = (...paths) => fs.readFileSync(path.join(...paths)).toString();

export default function (parameters = {}) {
    const additionalSections = [];
    const badges = [];
    const config = get(parameters, 'config', {});
    const cwd = process.cwd();
    const license = {};
    const pkg = get(parameters, 'pkg', {});
    const badgeStyle = get(config.badges, 'style', '');
    const licenseLinkTarget = License.getLinkTarget();
    const availableBadges = ['github-actions', 'license', 'node.js', 'npm'];
    const renderBadges = get(config.badges, 'render', availableBadges);
    const seeAlso = config['see-also'];
    const repositoryUrl = get(pkg.repository, 'url', '');
    const BoundGithubUrl = GithubUrl.bind(this, repositoryUrl);
    const githubUrl = attemptInstantiation(BoundGithubUrl, GithubUrlNullObject);

    config['prefer-yarn'] = result(config, 'prefer-yarn', yarnLockfileExists);

    if (githubUrl.is() && renderBadges.includes('github-actions')) {
        const githubActionsConfig = config?.badges?.config?.['github-actions'];
        const branch = githubActionsConfig?.branch ?? attempt(getDefaultGitBranch) ?? '';
        let workflow = githubActionsConfig?.workflow ?? '';

        if (!workflow.length) {
            const workflows = getGithubWorkflows();

            if (workflows.length === 1) workflow = workflows[0];
        }

        badges.push(new GithubActionsBadge({
            branch,
            githubPathname: githubUrl.pathname,
            style: badgeStyle,
            workflow
        }));
    }

    if (renderBadges.includes('npm')) {
        badges.push(new NpmBadge(pkg.name, badgeStyle));
    }

    if (renderBadges.includes('node.js') && get(pkg.engines, 'node')) {
        badges.push(new NodeJsBadge(pkg.name, badgeStyle));
    }

    if (githubUrl.is() && renderBadges.includes('license') && licenseLinkTarget) {
        badges.push(
            new LicenseBadge(githubUrl.pathname, licenseLinkTarget, badgeStyle)
        );
    }

    if (seeAlso) {
        additionalSections.push(new SeeAlsoSection(seeAlso));
    }

    if (licenseLinkTarget) {
        license.linkTarget = licenseLinkTarget;
    }

    const configPath = path.join(cwd, '.config', 'readme-md');
    const configSectionsPath = path.join(configPath, 'sections');
    const usage = attempt(() => readFile(configSectionsPath, 'usage.md').trim());

    if (usage) {
        additionalSections.push(new UsageSection(usage));
    }

    // If a description is specified in the config override the `package.json`
    // description value.
    if (config.description) {
        parameters.pkg.description = config.description;
    }

    return readme(
        Object.assign({}, parameters, { additionalSections, badges, license })
    );
}
