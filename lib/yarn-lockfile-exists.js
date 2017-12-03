'use strict';

const fs = require('fs-extra');

module.exports = function yarnLockfileExists() {
    const cwd = process.cwd();

    try {
        return fs.statSync(`${cwd}/yarn.lock`).isFile();
    } catch (_) {
        return false;
    }
};
