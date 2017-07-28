#!/usr/bin/env node

'use strict';

const app = require('../');
const {bold} = require('chalk');
const logSymbols = require('log-symbols');
const meow = require('meow');
const path = require('path');

let alias = {h: 'help', v: 'version'};
let usage = `
  Usage
      $ readme-md

  Options
      --help, -h       Display this message.
      --version, -v    Display the application version.
`;

meow(usage, {alias});

let bin = path.basename(process.argv.slice(1).shift());
let config = {};
let cwd = process.cwd();
let helpCmd = `${bin} --help`;
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

try {
    config = require(`${cwd}/.config/readme-md.json`);
} catch (_) { /* Do nothing. */ }

let parameters = Object.assign({}, {pkg}, config);
let readme = app(parameters);

console.log(readme);
