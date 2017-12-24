'use strict';

const fs = require('fs-extra');
const path = require('path');
const yaml = require('js-yaml');

const loadYamlFile = (path) => yaml.load(fs.readFileSync(path).toString());

module.exports = function loadConfig() {
    try {
        return loadYamlFile(`${process.cwd()}/.config/readme-md/config.yml`);
    } catch (_) {
        return {};
    }
};
