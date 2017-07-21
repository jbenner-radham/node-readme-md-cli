'use strict';

const frontMatter = require('front-matter');
const fs = require('fs-extra');
const get = require('lodash.get');
const path = require('path');
const readme = require('readme-md');

const indent = (text, indentation = '  ') => {
    return text.split(/\n|\r|\r\n/)
        .map(line => (line.trim().length >= 1) ? `${indentation}${line}` : line).join('\n');
};

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
                    let usageFileContents = fs.readFileSync(path.join(examplePath, 'cli', 'usage.txt'), {encoding: 'utf8'});
                    let usageFrontMatter = frontMatter(usageFileContents);
                    let usageArguments = get(usageFrontMatter.attributes, 'arguments', []);
                    let usageCmd = `$ ${usageFrontMatter.attributes.bin} ${usageArguments.map(arg => arg).join(' ')}`.trim();
                    usage = ['```sh', usageCmd, '', indent(usageFrontMatter.body.trim()), '```'].join('\n');
                } catch (_) {}
            }
        }
    }

    return readme(Object.assign({}, parameters, {usage}));
};
