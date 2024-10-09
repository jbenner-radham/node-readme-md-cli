import { execaSync } from 'execa';

export default function getDefaultGitBranch() {
    try {
        const result = execaSync('git', ['symbolic-ref', 'refs/remotes/origin/HEAD']);
        const [defaultBranch] = result.stdout.split('/').reverse();

        return defaultBranch
    } catch (_) { /* empty */ }

    try {
        const result = execaSync('git', ['remote', 'show', 'origin']);

        return result.stdout.match(/HEAD branch: (?<defaultBranch>.+)$/m)?.groups?.defaultBranch ?? '';
    } catch (_) { /* empty */ }

    return '';
}
