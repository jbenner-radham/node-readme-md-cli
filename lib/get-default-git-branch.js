import { execaCommandSync } from 'execa';

export default function getDefaultGitBranch() {
    const command = execaCommandSync('git symbolic-ref refs/remotes/origin/HEAD');
    const [defaultBranch] =  command.stdout.split('/').reverse();

    return defaultBranch;
}
