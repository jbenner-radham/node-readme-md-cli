#!/usr/bin/env node

import app from '../lib/index.js';
import attempt from '../lib/attempt.js';
import chalk from 'chalk';
import { checkbox, confirm, input } from '@inquirer/prompts';
import directoryExists from '../lib/directory-exists.js';
import fs from 'node:fs';
import getPackageManager from '../lib/get-package-manager.js';
import isGithubRepository from '../lib/is-github-repository.js';
import License from '../lib/License.js';
import loadConfig from '../lib/load-config.js';
import loadConfigTemplate from '../lib/load-config-template.js';
import logSymbols from 'log-symbols';
import meow from 'meow';
import { mkdirSync } from 'node:fs';
import parseJsonFile from '../lib/parse-json-file.js';
import path from 'node:path';
import process from 'node:process';
import radio from 'inquirer-radio-prompt';
import readFile from '../lib/read-file.js';

const { bold } = chalk;
const cwd = process.cwd();
const configDirectory = path.join(cwd, '.config', 'readme-md');
const bin = 'readme-md';
const helpCmd = `${bin} --help`;
const cli = meow(`
    Usage
        $ ${bin} [init]

    Options
        --help, -h               Display this message.
        --non-interactive, -n    Run in non-interactive mode.
        --version, -v            Display the application version.

    When invoked with the "init" sub-command a project level runtime
    configuration is initialized.
`, {
    flags: {
        help: { shortFlag: 'h' },
        nonInteractive: { shortFlag: 'n' },
        version: { shortFlag: 'v' }
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

    mkdirSync(configDirectory, { recursive: true });
    fs.writeFileSync(path.join(configDirectory, 'config.yaml'), config);
    console.log(logSymbols.success, message);
    process.exit(0);
}

const config = loadConfig();
let pkg = {};

try {
    pkg = parseJsonFile(cwd, 'package.json');
} catch (_) {
    const messages = [
        `No '${bold('package.json')}' file found.`,
        `Try another directory?`,
        `You can also run '${bold(helpCmd)}' for more info.`
    ];

    console.error(logSymbols.error, ...messages);
    process.exit(1);
}

const configSectionsPath = path.join(configDirectory, 'sections');
const usage = attempt(() => readFile(configSectionsPath, 'usage.md').trim());

if (!config.badges) config.badges = {};

if (!config.sectionOverrides) config.sectionOverrides = {};

if (usage) config.sectionOverrides.usage = usage;

if (process.env.CI !== 'true' && !cli.flags.nonInteractive) {
    pkg.name = await input({ default: pkg.name, message: 'Enter your package name' });
    config.badges.render = await checkbox({
        choices: [
            {
                checked: true,
                disabled: isGithubRepository(pkg.repository)
                    ? false
                    : '(repository must be set to a GitHub repo in your package.json)',
                name: 'GitHub Actions Workflow Status',
                value: 'github-actions'
            },
            {
                checked: true,
                disabled: isGithubRepository(pkg.repository) && pkg.license && License.getLinkTarget()
                    ? false
                    : '(repository must be set to a GitHub repo and license must be set in your package.json and you '
                        + 'must have a LICENSE file)',
                name: 'License Type',
                value: 'license'
            },
            {
                checked: true,
                disabled: pkg.engines?.node ? false : '(engines.node must be set in your package.json)',
                name: 'Node.js Version',
                value: 'node.js'
            },
            {
                checked: true,
                disabled: pkg.version ? false : '(version must be set in your package.json)',
                name: 'npm Version',
                value: 'npm'
            }
        ],
        message: 'Which badges do you wish to display?'
    })
    config.description = await input({
        default: config.description || pkg.description,
        message: 'Enter your package description'
    });
    config.preferDev = await confirm({
        default: config.preferDev ?? false,
        message: 'Prefer your package to be installed as a dev dependency?'
    });

    const packageManager = getPackageManager(pkg.engines);

    if (packageManager !== 'npm') {
        config.preferNpm = await confirm({ default: false, message: `Prefer npm over ${packageManager} in examples?` });
    }

    if (!usage) {
        config.preferSemicolons = await confirm({ default: true, message: 'Prefer semicolons in examples?' });
        config.quoteType = await radio({
            choices: [
                { name: 'Single', value: 'single' },
                { name: 'Double', value: 'double' }
            ],
            default: config.quoteType || 'single',
            message: 'Which type of quotes to use in example code?',
            required: true
        });
    }
}

const readme = app({ pkg, ...config });

console.log(readme);
