import attempt from './attempt.js';
import attemptInstantiation from './attempt-instantiation.js';
import getDefaultGitBranch from './get-default-git-branch.js';
import getGithubActionsWorkflow from './get-github-actions-workflow.js';
import GithubActionsBadge from './badges/GithubActionsBadge.js';
import GithubUrl from './GithubUrl.js';
import GithubUrlNullObject from './GithubUrlNullObject.js';
import License from './License.js';
import LicenseBadge from './badges/LicenseBadge.js';
import NodeJsBadge from './badges/NodeJsBadge.js';
import NpmBadge from './badges/NpmBadge.js';
import pnpmLockfileExists from './pnpm-lockfile-exists.js';
import readme from 'readme-md';
import SeeAlsoSection from './sections/SeeAlsoSection.js';
import yarnLockfileExists from 'yarn-lockfile-exists';
import type { AppConfig } from './types.js';

/**
 * Derives a readme from the passed config as well as project inspection.
 */
export default function app(this: any, config: AppConfig = {}): string {
    const additionalSections = [];
    const badges = [];
    const pkg = config?.pkg ?? {};
    const badgeStyle = config?.badges?.style ?? '';
    const licenseLink = License.getLinkTarget();
    const availableBadges = ['github-actions', 'license', 'node.js', 'npm'];
    const renderBadges = config?.badges?.render ?? availableBadges;
    const seeAlso = config?.seeAlso;
    const BoundGithubUrl = GithubUrl.bind(this, pkg.repository!); // It's okay if the repository is undefined.
    const githubUrl = attemptInstantiation(BoundGithubUrl, GithubUrlNullObject);

    if (renderBadges.includes('github-actions') && githubUrl.isValid()) {
        const githubActionsConfig = config?.badges?.config?.githubActions;
        const branch = githubActionsConfig?.branch ?? attempt(getDefaultGitBranch) ?? '';
        const workflow = getGithubActionsWorkflow(githubActionsConfig);

        if (branch && workflow) {
            badges.push(new GithubActionsBadge({
                branch,
                githubPathname: githubUrl.pathname,
                style: badgeStyle,
                workflow
            }));
        }
    }

    // TODO: Warn in the CLI if the package name is not set.
    if (renderBadges.includes('npm') && pkg.name) {
        badges.push(new NpmBadge({ pkgName: pkg.name, style: badgeStyle }));
    }

    // TODO: Warn in the CLI if the package name is not set.
    if (renderBadges.includes('node.js') && pkg.name && pkg?.engines?.node) {
        badges.push(new NodeJsBadge({ pkgName: pkg.name, style: badgeStyle }));
    }

    if (renderBadges.includes('license') && githubUrl.isValid() && licenseLink) {
        badges.push(
            new LicenseBadge({ githubPathname: githubUrl.pathname, link: licenseLink, style: badgeStyle })
        );
    }

    if (seeAlso) {
        additionalSections.push(new SeeAlsoSection(seeAlso));
    }

    // If a description is specified in the config, override the `package.json` description value.
    if (config.description) pkg.description = config.description;

    if (!pkg.packageManager && !pkg.engines?.npm && !pkg.engines?.pnpm && !pkg.engines?.yarn) {
        if (pnpmLockfileExists()) pkg.packageManager = 'pnpm@*';
        else if (yarnLockfileExists()) pkg.packageManager = 'yarn@*';
    }

    return readme(
        { ...config, additionalSections, badges, licenseLink, pkg }
    );
}
