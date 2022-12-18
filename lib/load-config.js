import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';

const loadYamlFile = (...filepath) => yaml.load(fs.readFileSync(path.resolve(...filepath)).toString());

export default function loadConfig() {
    const configBasePath = [process.cwd(), '.config', 'readme-md'];

    try {
        return loadYamlFile(...configBasePath, 'config.yaml');
    } catch (_) { /* Do nothing */ }

    try {
        return loadYamlFile(...configBasePath, 'config.yml');
    } catch (_) { /* Do nothing */ }

    return {};
}
