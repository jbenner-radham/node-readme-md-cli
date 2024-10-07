import attemptInstantiation from './attempt-instantiation.js';
import GithubUrl from './GithubUrl.js';
import GithubUrlNullObject from './GithubUrlNullObject.js';

export default function isGithubRepository(repository) {
    const BoundGithubUrl = GithubUrl.bind(this, repository);
    const githubUrl = attemptInstantiation(BoundGithubUrl, GithubUrlNullObject);

    return githubUrl.is();
}
