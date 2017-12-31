'use strict';

const fs = require('fs-extra');
const get = require('lodash.get');
const GitHubUrl = require('./GitHubUrl');
const isFile = require('./is-file');
const License = require('./License');
const path = require('path');
const readme = require('readme-md');
const {URL} = require('url');
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

    config['prefer-yarn'] = get(config, 'prefer-yarn', yarnLockfileExists());

    if (get(config.badges, 'npm')) {
        badges.push({
            name: 'npm',
            image: `https://img.shields.io/npm/v/${pkg.name}.svg`,
            link: `https://www.npmjs.com/package/${pkg.name}`,
            style: get(config.badges, 'style', '')
        });
    }

    if (get(config.badges, 'node') && get(pkg.engines, 'node')) {
        badges.push({
            name: 'node',
            image: `https://img.shields.io/node/v/${pkg.name}.svg`,
            link: 'https://nodejs.org/',
            style: get(config.badges, 'style', '')
        })
    }

    const gitHubUrl = new GitHubUrl(get(pkg.repository, 'url', ''));

    if (gitHubUrl.is()) {
        if (get(config.badges, 'travis-ci')) {
            badges.push({
                name: 'travis-ci',
                image: `https://img.shields.io/travis${gitHubUrl.pathname}.svg`,
                link: `https://travis-ci.org${gitHubUrl.pathname}`,
                style: get(config.badges, 'style', '')
            })
        }

        if (get(config.badges, 'license')) {
            badges.push({
                name: 'license',
                image: `https://img.shields.io/github/license${gitHubUrl.pathname}.svg`,
                link: 'LICENSE',
                style: get(config.badges, 'style', '')
            });
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
