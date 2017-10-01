'use strict';

const fs = require('fs-extra');
const get = require('lodash.get');
const path = require('path');
const readme = require('readme-md');

const readFile = (...file) => fs.readFileSync(path.join(...file), {encoding: 'utf8'});

module.exports = function(parameters = {}) {
    let additionalSections = [];
    let cwd = process.cwd();
    let license = {};
    let pkg = get(parameters, 'pkg', {});
    let usage = '';

    if (get(pkg, 'license')) {
        const licenseFilenames = ['LICENSE', 'LICENSE.md', 'LICENSE.txt'];

        for (let licenseFilename of licenseFilenames) {
            const licensePath = path.join(cwd, licenseFilename);

            if (fs.existsSync(licensePath)) {
                license.linkTarget = licenseFilename;
                break;
            }
        }
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
