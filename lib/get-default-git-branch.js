import { execaSync } from 'execa';

export default function getDefaultGitBranch() {
    try {
        /**
         * @see {@link https://stackoverflow.com/questions/28666357/how-to-get-default-git-branch#answer-44750379}
         */
        const result = execaSync('git', ['symbolic-ref', 'refs/remotes/origin/HEAD']);
        const [defaultBranch] = result.stdout.split('/').reverse();

        return defaultBranch
    } catch (_) { /* empty */ }

    try {
        /**
         * @see {@link https://stackoverflow.com/questions/28666357/how-to-get-default-git-branch#answer-50056710}
         */
        const result = execaSync('git', ['remote', 'show', 'origin']);

        return result.stdout.match(/HEAD branch: (?<defaultBranch>.+)$/m)?.groups?.defaultBranch ?? '';
    } catch (_) { /* empty */ }

    return '';
}
