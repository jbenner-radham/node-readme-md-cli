#!/usr/bin/env node

import app from '../lib/index.js';
import chalk from 'chalk';
import directoryExists from '../lib/directory-exists.js';
import fs from 'node:fs';
import loadConfig from '../lib/load-config.js';
import loadConfigTemplate from '../lib/load-config-template.js';
import logSymbols from 'log-symbols';
import makeDir from 'make-dir';
import meow from 'meow';
import path from 'node:path';

const { bold } = chalk;
const cwd = process.cwd();
const configDirectory = path.join(cwd, '.config', 'readme-md');
const bin = 'readme-md';
const helpCmd = `${bin} --help`;
const cli = meow(`
    Usage
        $ ${bin} [init]

    Options
        --help, -h       Display this message.
        --version, -v    Display the application version.

    When invoked with the "init" sub-command a project level runtime
    configuration is initialized.
`, {
    flags: {
        help: { alias: 'h' },
        version: { alias: 'v' }
    },
    importMeta: import.meta
});

if (cli.input.includes('init')) {
    if (directoryExists(configDirectory)) {
        const messages = [
            `A preexisting ${bold(path.join('.config', 'readme-md'))} directory was found.`,
            `Did you mean to initialize in another directory?`,
            `You can also run '${bold(helpCmd)}' for more info.`
        ];

        console.error(logSymbols.error, ...messages);
        process.exit(1);
    }

    const config = loadConfigTemplate();
    const configPath = path.join('.config', 'readme-md', 'config.yaml');
    const message = `Successfully initialized a project config to ${bold(configPath)}.`;

    makeDir.sync(configDirectory);
    fs.writeFileSync(path.join(configDirectory, 'config.yaml'), config);
    console.log(logSymbols.success, message);
    process.exit(0);
}

const config = loadConfig();
let pkg = {};

try {
    pkg = JSON.parse(fs.readFileSync(path.join(cwd, 'package.json')).toString());
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
