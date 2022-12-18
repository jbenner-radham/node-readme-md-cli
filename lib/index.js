import attempt from './attempt.js';
import attemptInstantiation from './attempt-instantiation.js';
import fs from 'node:fs';
import get from 'lodash.get';
import GitHubUrl from './GitHubUrl.js';
import GitHubUrlNullObject from './GitHubUrlNullObject.js';
import License from './License.js';
import LicenseBadge from './LicenseBadge.js';
import NodeJsBadge from './NodeJsBadge.js';
import NpmBadge from './NpmBadge.js';
import path from 'node:path';
import readme from 'readme-md';
import result from 'lodash.result';
import SeeAlsoSection from './SeeAlsoSection.js';
import TravisCiBadge from './TravisCiBadge.js';
import UsageSection from './UsageSection.js';
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
    const availableBadges = ['license', 'node.js', 'npm', 'travis-ci'];
    const renderBadges = get(config.badges, 'render', availableBadges);
    const seeAlso = config['see-also'];
    const repositoryUrl = get(pkg.repository, 'url', '');
    const BoundGitHubUrl = GitHubUrl.bind(this, repositoryUrl);
    const gitHubUrl = attemptInstantiation(BoundGitHubUrl, GitHubUrlNullObject);

    config['prefer-yarn'] = result(config, 'prefer-yarn', yarnLockfileExists);

    if (renderBadges.includes('npm')) {
        badges.push(new NpmBadge(pkg.name, badgeStyle));
    }

    if (renderBadges.includes('node.js') && get(pkg.engines, 'node')) {
        badges.push(new NodeJsBadge(pkg.name, badgeStyle));
    }

    if (gitHubUrl.is() && renderBadges.includes('travis-ci')) {
        badges.push(new TravisCiBadge(gitHubUrl.pathname, badgeStyle));
    }

    if (gitHubUrl.is() && renderBadges.includes('license') && licenseLinkTarget) {
        badges.push(
            new LicenseBadge(gitHubUrl.pathname, licenseLinkTarget, badgeStyle)
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
