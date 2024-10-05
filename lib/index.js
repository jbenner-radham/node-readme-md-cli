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
import pnpmLockfileExists from './pnpm-lockfile-exists.js';
import readme from 'readme-md';
import SeeAlsoSection from './sections/SeeAlsoSection.js';
import yarnLockfileExists from 'yarn-lockfile-exists';

const readFile = (...paths) => fs.readFileSync(path.join(...paths)).toString();

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
    const cwd = process.cwd();
    const pkg = config?.pkg ?? {};
    const badgeStyle = config?.badges?.style ?? '';
    const licenseLinkTarget = License.getLinkTarget();
    const availableBadges = ['github-actions', 'license', 'node.js', 'npm'];
    const renderBadges = config?.badges?.render ?? availableBadges;
    const seeAlso = config?.seeAlso;
    const repositoryUrl = pkg?.repository?.url ?? '';
    const BoundGithubUrl = GithubUrl.bind(this, repositoryUrl);
    const githubUrl = attemptInstantiation(BoundGithubUrl, GithubUrlNullObject);

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

    const licenseLink = licenseLinkTarget ?? undefined;
    const configPath = path.join(cwd, '.config', 'readme-md');
    const configSectionsPath = path.join(configPath, 'sections');
    const usage = attempt(() => readFile(configSectionsPath, 'usage.md').trim());
    const sectionOverrides = {};

    if (usage) {
        sectionOverrides.usage = usage;
    }

    // If a description is specified in the config override the `package.json`
    // description value.
    if (config.description) {
        pkg.description = config.description;
    }

    if (!pkg.engines?.npm && !pkg.engines?.pnpm && !pkg.engines?.yarn) {
        if (!pkg.engines) pkg.engines = {};

        if (pnpmLockfileExists()) pkg.engines.pnpm = '*';
        else if (yarnLockfileExists()) pkg.engines.yarn = '*';
    }

    return readme(
        { ...config, additionalSections, badges, licenseLink, pkg, sectionOverrides }
    );
}
