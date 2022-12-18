import fs from 'node:fs';

export default function directoryExists(path) {
    try {
        return fs.statSync(path).isDirectory();
    } catch (_) {
        return false;
    }
}
