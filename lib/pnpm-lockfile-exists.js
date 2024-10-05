import fs from 'node:fs';
import path from 'node:path';

/**
 * Determine if a pnpm lockfile exists.
 *
 * @param {Object} [config = {}]
 * @param {string} [config.cwd]
 * @returns {boolean}
 */
export default function pnpmLockfileExists(config = {}) {
    const cwd = config.cwd ?? process.cwd();

    try {
        return fs.statSync(path.join(cwd, 'pnpm-lock.yaml')).isFile();
    } catch (_) {
        return false;
    }
}
