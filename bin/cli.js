#!/usr/bin/env node

'use strict';

const app = require('../');

const cwd = process.cwd();
const pkg = require(`${cwd}/package.json`);
const readme = app({pkg});

console.log(readme);
