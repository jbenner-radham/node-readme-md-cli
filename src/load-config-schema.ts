import type { ReadmeMdCliConfig } from './types.js';
import type { JSONSchemaType } from 'ajv';
import readFile from './read-file.js';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function loadConfigSchema(): JSONSchemaType<ReadmeMdCliConfig> {
    const src = readFile(__dirname, '..', 'config.schema.json');

    return JSON.parse(src);
}
