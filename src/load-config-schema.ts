import readFile from './read-file.js';
import type { ReadmeMdCliConfig } from './types.js';
import type { JSONSchemaType } from 'ajv';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function loadConfigSchema(): JSONSchemaType<ReadmeMdCliConfig> {
  const src = readFile(__dirname, '..', 'config.schema.json');

  return JSON.parse(src);
}
