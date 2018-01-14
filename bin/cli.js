#!/usr/bin/env node

'use strict';

const app = require('../');
const {bold} = require('chalk');
const directoryExists = require('../lib/directory-exists');
const fileExists = require('file-exists');
const fs = require('fs-extra');
const loadConfig = require('../lib/load-config');
const logSymbols = require('log-symbols');
const meow = require('meow');
const path = require('path');

let alias = {h: 'help', v: 'version'};
let cwd = process.cwd();
let bin = path.basename(process.argv.slice(1).shift());
let helpCmd = `${bin} --help`;
let usage = `
  Usage
      $ readme-md [init]

  Options
      --help, -h       Display this message.
      --version, -v    Display the application version.
`;

const cli = meow(usage, {alias});

if (cli.input.includes('init')) {
    if (directoryExists(`${cwd}/.config/readme-md`)) {
        let messages = [
            `A preexisting ${bold('.config/readme-md')} directory was found.`,
            `Did you mean to initialize in another directory?`,
            `You can also run '${bold(helpCmd)}' for more info.`
        ];

        console.error(logSymbols.error, ...messages);
        process.exit(1);
    }

    let config = fs.readFileSync('../template/config.yml').toString();
    let configPath = `${cwd}/.config/readme-md/config.yml`;
    let message = `Successfully initialized a project config to ${bold(configPath)}.`

    fs.outputFileSync(configPath, config);
    console.log(logSymbols.success, message);
    process.exit(0);
}

let config = loadConfig();
let pkg;

try {
    pkg = require(`${cwd}/package.json`);
} catch (_) {
    let messages = [
        `No '${bold('package.json')}' file found.`,
        `Try another directory?`,
        `You can also run '${bold(helpCmd)}' for more info.`
    ];

    console.error(logSymbols.error, ...messages);
    process.exit(1);
}

let parameters = Object.assign({}, {pkg}, {config});
let readme = app(parameters);

console.log(readme);
