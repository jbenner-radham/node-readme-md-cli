import fs from 'node:fs';
import path from 'node:path';

export default function readFile(...paths: string[]): string {
    return fs.readFileSync(path.resolve(...paths)).toString();
}
