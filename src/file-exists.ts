import fs from 'node:fs';

export default function fileExists(path: string): boolean {
  try {
    return fs.statSync(path).isFile();
  } catch (_) {
    return false;
  }
}
