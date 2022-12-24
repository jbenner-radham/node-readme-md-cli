import attempt from './attempt.js';
import attemptInstantiation from './attempt-instantiation.js';
import fs from 'node:fs';
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
import SeeAlsoSection from './sections/SeeAlsoSection.js';
import UsageSection from './sections/UsageSection.js';
import yarnLockfileExists from 'yarn-lockfile-exists';

const readFile = (...paths) => fs.readFileSync(path.join(...paths)).toString();

export default function app(config = {}) {
    const additionalSections = [];
    const badges = [];
    const cwd = process.cwd();
    const license = {};
    const pkg = config?.pkg ?? {};
    const badgeStyle = config?.badges?.style ?? '';
    const licenseLinkTarget = License.getLinkTarget();
    const availableBadges = ['github-actions', 'license', 'node.js', 'npm'];
    const renderBadges = config?.badges?.render ?? availableBadges;
    const seeAlso = config?.seeAlso;
    const repositoryUrl = pkg?.repository?.url ?? '';
    const BoundGithubUrl = GithubUrl.bind(this, repositoryUrl);
    const githubUrl = attemptInstantiation(BoundGithubUrl, GithubUrlNullObject);
    const preferYarn = config?.preferYarn ?? yarnLockfileExists();

    if (githubUrl.is() && renderBadges.includes('github-actions')) {
        const githubActionsConfig = config?.badges?.config?.githubActions;
        const branch = githubActionsConfig?.branch ?? attempt(getDefaultGitBranch) ?? '';

        const getGithubActionsWorkflow = () => {
            if (githubActionsConfig?.workflow?.length) {
                return githubActionsConfig.workflow;
            }

            const workflows = getGithubWorkflows();

            if (workflows.length === 1) {
                return workflows[0];
            }

            return '';
        };

        badges.push(new GithubActionsBadge({
            branch,
            githubPathname: githubUrl.pathname,
            style: badgeStyle,
            workflow: getGithubActionsWorkflow()
        }));
    }

    if (renderBadges.includes('npm')) {
        badges.push(new NpmBadge({ pkgName: pkg.name, style: badgeStyle }));
    }

    if (renderBadges.includes('node.js') && pkg?.engines?.node) {
        badges.push(new NodeJsBadge({ pkgName: pkg.name, style: badgeStyle }));
    }

    if (githubUrl.is() && renderBadges.includes('license') && licenseLinkTarget) {
        badges.push(
            new LicenseBadge({ githubPathname: githubUrl.pathname, link: licenseLinkTarget, style: badgeStyle })
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
        pkg.description = config.description;
    }

    return readme(
        { ...config, additionalSections, badges, license, pkg, preferYarn }
    );
}
