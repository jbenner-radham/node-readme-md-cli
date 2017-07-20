#!/usr/bin/env node

'use strict';

const app = require('../');
const {bold} = require('chalk');
const logSymbols = require('log-symbols');
const meow = require('meow');

const cli = meow(`
    Usage
      $ readme-md

    Options
      --help, -h     Display this message.
      --version, -v  Display the application version.
`, {
    alias: {
        h: 'help',
        v: 'version'
    }
});

let cwd = process.cwd();
let pkg;

try {
    pkg = require(`${cwd}/package.json`);
} catch (_) {
    let message = `No ${bold('package.json')} file found. Try another directory?`

    console.error(logSymbols.error, message);
    process.exit(1);
}

let readme = app({pkg});

console.log(readme);
