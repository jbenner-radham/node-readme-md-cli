import fs from 'node:fs';

export default function directoryExists(path: string): boolean {
    try {
        return fs.statSync(path).isDirectory();
    } catch (_) {
        return false;
    }
}
