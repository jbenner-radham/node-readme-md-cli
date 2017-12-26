'use strict';

const fs = require('fs-extra');
const get = require('lodash.get');
const isFile = require('./is-file');
const License = require('./license');
const path = require('path');
const readme = require('readme-md');
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
