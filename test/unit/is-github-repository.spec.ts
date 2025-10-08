import isGithubRepository from '../../src/is-github-repository.js';
import { beforeEach, describe, expect, it } from 'vitest';

describe('isGithubRepository', () => {
  let repository: string;

  beforeEach(() => {
    repository = 'git+https://github.com/jbenner-radham/node-readme-md-cli.git';
  });

  it('is a function', () => {
    expect(isGithubRepository).toBeTypeOf('function');
  });

  it('returns a boolean', () => {
    expect(isGithubRepository(repository)).toBeTypeOf('boolean');
  });

  it('returns true when passed a GitHub repository', () => {
    expect(isGithubRepository(repository)).toBe(true);
  });

  it('returns false when passed a non-GitHub repository', () => {
    repository = 'git+https://example.com/user/project.git';

    expect(isGithubRepository(repository)).toBe(false);
  });
});
