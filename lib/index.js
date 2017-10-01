'use strict';

const Config = require('./config');
const fs = require('fs-extra');
const get = require('lodash.get');
const License = require('./license');
const path = require('path');
const readme = require('readme-md');

const readFile = (...file) => fs.readFileSync(path.join(...file)).toString();

module.exports = function(parameters = {}) {
    let additionalSections = [];
    let cwd = process.cwd();
    let license = {};
    let pkg = get(parameters, 'pkg', {});
    let usage = '';

    if (Config.fileExists()) {
        try {
            const config = Config.read();

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
        } catch (_) { /* Do nothing. */ }
    }

    if (get(pkg, 'license')) {
        license.linkTarget = License.getLinkTarget();
    }

    if (get(pkg, 'directories.example')) {
        let examplePath = path.join(cwd, pkg.directories.example);
        let exampleContents = fs.readdirSync(examplePath);

        if (exampleContents.length === 1) {
            if (exampleContents[0] === 'cli') {
                try {
                    usage = readFile(examplePath, 'cli', 'usage.md').trim();
                    additionalSections.push({
                        position: 'after:Install',
                        title: 'Usage',
                        body: usage
                    });
                } catch (_) { /* Do nothing. */ }
            }
        }
    }

    return readme(Object.assign({}, parameters, {additionalSections, license}));
};
