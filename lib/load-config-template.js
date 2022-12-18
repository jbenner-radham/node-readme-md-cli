import { fileURLToPath } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default function loadConfigTemplate() {
    const template = path.resolve(`${__dirname}/../template/config.yml`);

    return fs.readFileSync(template).toString();
}
