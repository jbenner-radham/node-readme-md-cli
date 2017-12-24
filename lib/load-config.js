'use strict';

const fs = require('fs-extra');
const path = require('path');
const yaml = require('js-yaml');

module.exports = function loadConfig() {
    try {
        return yaml.load(
            fs.readFileSync(
                path.join(process.cwd(), '.config', 'readme-md', 'config.yml')
            ).toString()
        );
    } catch (_) {
        return {};
    }
};
