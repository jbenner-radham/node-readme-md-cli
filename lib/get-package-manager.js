import pnpmLockfileExists from './pnpm-lockfile-exists.js';
import yarnLockfileExists from 'yarn-lockfile-exists';

export default function getPackageManager(pkg = {}) {
    if (pkg.packageManager) {
        const atIndex = pkg.packageManager.indexOf('@');
        const packageManager = atIndex !== -1 ? pkg.packageManager.slice(0, atIndex) : pkg.packageManager;

        if (['npm', 'pnpm'].includes(packageManager)) return packageManager;

        if (packageManager === 'yarn') return 'Yarn';

        return 'npm';
    }

    if (pkg.engines?.npm) return 'npm';

    if (pkg.engines?.pnpm) return 'pnpm';

    if (pkg.engines?.yarn) return 'Yarn';

    if (pnpmLockfileExists()) return 'pnpm';

    if (yarnLockfileExists()) return 'Yarn';

    return 'npm';
}
