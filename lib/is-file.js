'use strict';

const fs = require('fs-extra');

module.exports = function isFile(filePath) {
    return fs.statSync(filePath).isFile();
};
