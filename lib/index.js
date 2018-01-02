'use strict';

const fs = require('fs-extra');
const get = require('lodash.get');
const GitHubUrl = require('./GitHubUrl');
const isFile = require('./is-file');
const License = require('./License');
const LicenseBadge = require('./LicenseBadge');
const NodeJsBadge = require('./NodeJsBadge');
const NpmBadge = require('./NpmBadge');
const path = require('path');
const readme = require('readme-md');
const SeeAlsoSection = require('./SeeAlsoSection');
const TravisCiBadge = require('./TravisCiBadge');
const UsageSection = require('./UsageSection');
const yarnLockfileExists = require('yarn-lockfile-exists');

const readFile = (...paths) => fs.readFileSync(path.join(...paths)).toString();

module.exports = function(parameters = {}) {
    let additionalSections = [];
    let badges = [];
    let config = get(parameters, 'config', {});
    let cwd = process.cwd();
    let license = {};
    let pkg = get(parameters, 'pkg', {});
    let usage = '';
    const badgeStyle = get(config.badges, 'style', '');
    const gitHubUrl = new GitHubUrl(get(pkg.repository, 'url', ''));
    const licenseLinkTarget = License.getLinkTarget();
    const renderBadges = get(config.badges, 'render', []);
    const seeAlso = config['see-also'];

    config['prefer-yarn'] = get(config, 'prefer-yarn', yarnLockfileExists());

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

    return readme(
        Object.assign({}, parameters, {additionalSections, badges, license})
    );
};
