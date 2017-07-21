'use strict';

const fs = require('fs-extra');
const get = require('lodash.get');
const path = require('path');
const readme = require('readme-md');

module.exports = function(parameters = {}) {
    let cwd = process.cwd();
    let pkg = get(parameters, 'pkg', {});
    let usage;

    if (get(pkg, 'directories.example')) {
        let examplePath = path.join(cwd, pkg.directories.example);
        let exampleContents = fs.readdirSync(examplePath);

        if (exampleContents.length === 1) {
            if (exampleContents[0] === 'cli') {
                try {
                    usage = fs.readFileSync(path.join(examplePath, 'cli', 'usage.md'), {encoding: 'utf8'});
                } catch (_) { /* Do nothing. */ }
            }
        }
    }

    return readme(Object.assign({}, parameters, {usage}));
};
