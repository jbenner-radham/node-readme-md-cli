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

/**
 * The config for the `app` function.
 *
 * @typedef {Object} AppConfig
 * @property {Object} [badges] - The config object for badge generation.
 * @property {Object} [badges.config] - The config object for badges. Currently only GitHub Actions badges have configuration.
 * @property {Object} [badges.config.githubActions] - The config object for GitHub Actions badges.
 * @property {string} [badges.config.githubActions.branch] - The Git branch which has the desired workflow to generate the "github-actions" badge off of.
 * @property {string} [badges.config.githubActions.workflow] - The GitHub Actions workflow filename (e.g., ci.yaml) to generate the "github-actions" badge off of.
 * @property {string[]} [badges.render] - The badges to render. The options are "github-actions", "license", "node.js", and "npm".
 * @property {string} [badges.style] - The style to render the badges in. The options are "flat", "flat-square", "for-the-badge", "plastic", and "social".
 * @property {string} [description] - A description for the readme which overrides any value defined in `AppConfig.pkg.description`.
 * @property {Object} [pkg] - The contents of or a representation of a `package.json` file.
 * @property {Object} [pkg.engines] - The specified runtime and/or package manager engines for the package.
 * @property {string} [pkg.engines.npm] - The specified version requirement for npm.
 * @property {string} [pkg.engines.pnpm] - The specified version requirement for pnpm.
 * @property {string} [pkg.engines.yarn] - The specified version requirement for Yarn.
 * @property {Object} [seeAlso] - Any key/value pairs defined here will be defined as a list of links. The key being the name and the value being the link.
 */

/**
 * Derives a readme from the passed config as well as project inspection.
 *
 * @param {AppConfig} config
 * @returns {string}
 */
export default function app(config = {}) {
    const additionalSections = [];
    const badges = [];
    const pkg = config?.pkg ?? {};
    const badgeStyle = config?.badges?.style ?? '';
    const licenseLink = License.getLinkTarget();
    const availableBadges = ['github-actions', 'license', 'node.js', 'npm'];
    const renderBadges = config?.badges?.render ?? availableBadges;
    const seeAlso = config?.seeAlso;
    const BoundGithubUrl = GithubUrl.bind(this, pkg.repository);
    const githubUrl = attemptInstantiation(BoundGithubUrl, GithubUrlNullObject);

    if (githubUrl.is() && renderBadges.includes('github-actions')) {
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

    if (renderBadges.includes('npm')) {
        badges.push(new NpmBadge({ pkgName: pkg.name, style: badgeStyle }));
    }

    if (renderBadges.includes('node.js') && pkg?.engines?.node) {
        badges.push(new NodeJsBadge({ pkgName: pkg.name, style: badgeStyle }));
    }

    if (githubUrl.is() && renderBadges.includes('license') && licenseLink) {
        badges.push(
            new LicenseBadge({ githubPathname: githubUrl.pathname, link: licenseLink, style: badgeStyle })
        );
    }

    if (seeAlso) {
        additionalSections.push(new SeeAlsoSection(seeAlso));
    }

    // If a description is specified in the config override the `package.json` description value.
    if (config.description) pkg.description = config.description;

    if (!pkg.packageManager && !pkg.engines?.npm && !pkg.engines?.pnpm && !pkg.engines?.yarn) {
        if (pnpmLockfileExists()) pkg.packageManager = 'pnpm@*';
        else if (yarnLockfileExists()) pkg.packageManager = 'yarn@*';
    }

    return readme(
        { ...config, additionalSections, badges, licenseLink, pkg }
    );
}
