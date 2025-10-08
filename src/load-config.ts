import camelcaseKeys from 'camelcase-keys';
import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import type { ReadmeMdCliConfig } from './types.js';
import { Ajv } from 'ajv';
import isPlainObject from 'is-plain-obj';
import loadConfigSchema from './load-config-schema.js';

const loadYamlFile = (...filepath: string[]): unknown =>
    yaml.load(fs.readFileSync(path.resolve(...filepath)).toString());

const isValidConfig = (config: unknown): config is ReadmeMdCliConfig => {
    const ajv = new Ajv();
    const schema = loadConfigSchema();
    const validate = ajv.compile(schema);

    return validate(config);
};

export default function loadConfig(): ReadmeMdCliConfig {
    const configDirectoryPath = path.join(process.cwd(), '.config', 'readme-md');
    const configFileNames = ['config.yaml', 'config.yml'];
    const configFileName = configFileNames.find(filename => {
       try {
           return fs.statSync(path.join(configDirectoryPath, filename)).isFile();
       } catch (_) {
           return false;
       }
    });

    if (!configFileName) {
        return {};
    }

    try {
        const rawConfig = loadYamlFile(configDirectoryPath, configFileName);
        const normalizedConfig = isPlainObject(rawConfig) ? camelcaseKeys(rawConfig, { deep: true }) : null;

        return isValidConfig(normalizedConfig) ? normalizedConfig : {};
    } catch (_) {
        return {};
    }
}
