import attemptInstantiation from './attempt-instantiation.js';
import GithubUrl, { type GithubUrlConfig } from './GithubUrl.js';
import GithubUrlNullObject from './GithubUrlNullObject.js';

export default function isGithubRepository(this: any, repository: GithubUrlConfig): boolean {
    const BoundGithubUrl = GithubUrl.bind(this, repository);
    const githubUrl = attemptInstantiation(BoundGithubUrl, GithubUrlNullObject);

    return githubUrl.is();
}
