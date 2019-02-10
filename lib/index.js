const attemptInstantiation = require('./attempt-instantiation');
const fs = require('fs');
const get = require('lodash.get');
const GitHubUrl = require('./GitHubUrl');
const GitHubUrlNullObject = require('./GitHubUrlNullObject');
const License = require('./License');
const LicenseBadge = require('./LicenseBadge');
const NodeJsBadge = require('./NodeJsBadge');
const NpmBadge = require('./NpmBadge');
const path = require('path');
const readme = require('readme-md');
const result = require('lodash.result');
const SeeAlsoSection = require('./SeeAlsoSection');
const TravisCiBadge = require('./TravisCiBadge');
const UsageSection = require('./UsageSection');
const yarnLockfileExists = require('yarn-lockfile-exists');

const readFile = (...paths) => fs.readFileSync(path.join(...paths)).toString();

module.exports = function (parameters = {}) {
    const additionalSections = [];
    const badges = [];
    const config = get(parameters, 'config', {});
    const cwd = process.cwd();
    const license = {};
    const pkg = get(parameters, 'pkg', {});
    let usage = '';
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

    try {
        usage = readFile(configSectionsPath, 'usage.md').trim();
    } catch (_) { /* Do nothing. */ }

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
};
