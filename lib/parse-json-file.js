import fs from 'node:fs';
import path from 'node:path';

export default function parseJsonFile(...paths) {
    const filepath = path.join(...paths);
    const source = fs.readFileSync(filepath).toString();

    return JSON.parse(source);
}
