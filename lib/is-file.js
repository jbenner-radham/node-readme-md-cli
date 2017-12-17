'use strict';

const fs = require('fs-extra');

module.exports = function isFile(filePath) {
    try {
        return fs.statSync(filePath).isFile();
    } catch (_) {
        return false;
    }
};
