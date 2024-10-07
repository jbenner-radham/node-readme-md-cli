import fs from 'node:fs';
import path from 'node:path';

export default function readFile(...paths) {
    return fs.readFileSync(path.join(...paths)).toString();
}
