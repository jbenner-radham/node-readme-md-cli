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
const TravisCiBadge = require('./TravisCiBadge');
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

    config['prefer-yarn'] = get(config, 'prefer-yarn', yarnLockfileExists());

    if (get(config.badges, 'render', []).includes('npm')) {
        badges.push(new NpmBadge(pkg.name, badgeStyle));
    }

    if (get(config.badges, 'render', []).includes('node.js') && get(pkg.engines, 'node')) {
        badges.push(new NodeJsBadge(pkg.name, badgeStyle));
    }

    if (gitHubUrl.is()) {
        if (get(config.badges, 'render', []).includes('travis-ci')) {
            badges.push(new TravisCiBadge(gitHubUrl.pathname, badgeStyle));
        }

        if (get(config.badges, 'render', []).includes('license')) {
            badges.push(new LicenseBadge(gitHubUrl.pathname, 'LICENSE', badgeStyle));
        }
    }

    if (config['see-also']) {
        const linkNames = Object.keys(config['see-also']);
        const links = linkNames.map(linkName => {
            const linkTarget = config['see-also'][linkName];

            return `- [${linkName}](${linkTarget})`;
        });

        additionalSections.push({
            position: -1,
            title: 'See Also',
            body: links.join('\n')
        });
    }

    if (pkg.license) {
        license.linkTarget = License.getLinkTarget();
    }

    const configPath = path.join(cwd, '.config', 'readme-md');
    const configSectionsPath = path.join(configPath, 'sections');

    if (isFile(path.join(configSectionsPath, 'usage.md'))) {
        try {
            usage = readFile(configSectionsPath, 'usage.md').trim();
        } catch (_) { /* Do nothing. */ }
    } else if (get(pkg, 'directories.example')) {
        let examplePath = path.join(cwd, pkg.directories.example);
        let exampleContents = fs.readdirSync(examplePath);

        if (exampleContents.length === 1) {
            if (exampleContents[0] === 'cli') {
                try {
                    usage = readFile(examplePath, 'cli', 'usage.md').trim();
                } catch (_) { /* Do nothing. */ }
            }
        }
    }

    if (usage) {
        additionalSections.push({
            position: 'after:Install',
            title: 'Usage',
            body: usage
        });
    }

    return readme(
        Object.assign({}, parameters, {additionalSections, badges, license})
    );
};
