import pnpmLockfileExists from './pnpm-lockfile-exists.js';
import yarnLockfileExists from 'yarn-lockfile-exists';

export default function getPackageManager(engines = {}) {
    if (engines.npm) return 'npm';

    if (engines.pnpm) return 'pnpm';

    if (engines.yarn) return 'Yarn';

    if (pnpmLockfileExists()) return 'pnpm';

    if (yarnLockfileExists()) return 'Yarn';

    return 'npm';
}
