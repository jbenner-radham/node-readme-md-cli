'use strict';

const fs = require('fs');

module.exports = function directoryExists(path) {
    try {
        return fs.statSync(path).isDirectory();
    } catch (_) {
        return false;
    }
};
