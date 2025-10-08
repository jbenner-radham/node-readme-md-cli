import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function loadConfigTemplate(): string {
  const filepath = path.resolve(__dirname, '..', 'template', 'config.yaml');

  return fs.readFileSync(filepath).toString();
}
