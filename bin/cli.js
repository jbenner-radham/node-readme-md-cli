#!/usr/bin/env node

'use strict';

const app = require('../');
const { bold } = require('chalk');
const directoryExists = require('../lib/directory-exists');
const fs = require('fs');
const loadConfig = require('../lib/load-config');
const logSymbols = require('log-symbols');
const makeDir = require('make-dir');
const meow = require('meow');

const alias = { h: 'help', v: 'version' };
const cwd = process.cwd();
const bin = 'readme-md';
const helpCmd = `${bin} --help`;
const usage = `
  Usage
      $ ${bin} [init]

  Options
      --help, -h       Display this message.
      --version, -v    Display the application version.

  When invoked with the "init" sub-command a project level runtime
  configuration is initialized.
`;

const cli = meow(usage, { alias });
const configDirectory = `${cwd}/.config/readme-md`;

if (cli.input.includes('init')) {
    if (directoryExists(configDirectory)) {
        const messages = [
            `A preexisting ${bold('.config/readme-md')} directory was found.`,
            `Did you mean to initialize in another directory?`,
            `You can also run '${bold(helpCmd)}' for more info.`
        ];

        console.error(logSymbols.error, ...messages);
        process.exit(1);
    }

    const config = fs.readFileSync('../template/config.yml').toString();
    const configPath = '.config/readme-md/config.yml';
    const message = `Successfully initialized a project config to ${bold(configPath)}.`;

    makeDir.sync(configDirectory);
    fs.writeFileSync(`${configDirectory}/config.yml`, config);
    console.log(logSymbols.success, message);
    process.exit(0);
}

const config = loadConfig();
let pkg;

try {
    pkg = require(`${cwd}/package.json`);
} catch (_) {
    const messages = [
        `No '${bold('package.json')}' file found.`,
        `Try another directory?`,
        `You can also run '${bold(helpCmd)}' for more info.`
    ];

    console.error(logSymbols.error, ...messages);
    process.exit(1);
}

const parameters = Object.assign({}, { pkg }, { config });
const readme = app(parameters);

console.log(readme);
