const fs = require('fs');
const yaml = require('js-yaml');

const loadYamlFile = (path) => yaml.load(fs.readFileSync(path).toString());

module.exports = function loadConfig() {
    try {
        return loadYamlFile(`${process.cwd()}/.config/readme-md/config.yml`);
    } catch (_) {
        return {};
    }
};
