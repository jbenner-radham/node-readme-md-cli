import fs from 'node:fs';
import yaml from 'js-yaml';

const loadYamlFile = (path) => yaml.load(fs.readFileSync(path).toString());

export default function loadConfig() {
    try {
        return loadYamlFile(`${process.cwd()}/.config/readme-md/config.yml`);
    } catch (_) {
        return {};
    }
}
