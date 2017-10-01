'use strict';

const fs = require('fs-extra');

module.exports = function pathExists(filePath) {
    return fs.existsSync(filePath);
};
