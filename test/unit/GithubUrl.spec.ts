import GithubUrl from '../../src/GithubUrl.js';
import { describe, expect, it } from 'vitest';

describe('GithubUrl', () => {
  it('is a class', () => {
    const { constructor } = GithubUrl.prototype;

    expect(constructor.toString().startsWith('class')).toBe(true);
  });

  describe('.isPrefixedShortcutSyntax', () => {
    it('returns `true` when passed a repository in a prefixed shortcut syntax', () => {
      expect(GithubUrl.isPrefixedShortcutSyntax('github:user/repo')).toBe(true);
    });

    it('returns `false` when passed a repository in un-prefixed shortcut syntax', () => {
      expect(GithubUrl.isPrefixedShortcutSyntax('user/repo')).toBe(false);
    });
  });

  describe('.isUnprefixedShortcutSyntax', () => {
    it('returns `true` when passed a un-prefixed shortcut syntax', () => {
      expect(GithubUrl.isUnprefixedShortcutSyntax('user/repo')).toBe(true);
    });

    it('returns `false` when passed a prefixed shortcut syntax', () => {
      expect(GithubUrl.isUnprefixedShortcutSyntax('github:user/repo')).toBe(false);
    });
  });

  describe('.unprefixShortcutSyntax', () => {
    it('strips the prefix when passed a prefixed shortcut syntax', function () {
      expect(GithubUrl.unprefixShortcutSyntax('github:user/repo')).toBe('user/repo');
    });
  });
});
