import GithubUrl from '../../lib/GithubUrl.js';

describe('GithubUrl', function () {
    it('is a class', function () {
        expect(GithubUrl.prototype.constructor.toString().startsWith('class')).toBeTrue();
    });

    describe('.isPrefixedShortcutSyntax', function () {
       it('returns `true` when passed a repository in a prefixed shortcut syntax', function () {
           expect(GithubUrl.isPrefixedShortcutSyntax('github:user/repo')).toBe(true);
       });

       it('returns `false` when passed a repository in un-prefixed shortcut syntax', function () {
          expect(GithubUrl.isPrefixedShortcutSyntax('user/repo')).toBe(false);
       });
    });

    describe('.isUnprefixedShortcutSyntax', function () {
        it('returns `true` when passed a un-prefixed shortcut syntax', function () {
            expect(GithubUrl.isUnprefixedShortcutSyntax('user/repo')).toBe(true);
        });

        it('returns `false` when passed a prefixed shortcut syntax', function () {
            expect(GithubUrl.isUnprefixedShortcutSyntax('github:user/repo')).toBe(false);
        });
    });

    describe('.unprefixShortcutSyntax', function () {
        it('returns an un-prefixed shortcut syntax when passed a prefixed shortcut syntax', function () {
            expect(GithubUrl.unprefixShortcutSyntax('github:user/repo')).toBe('user/repo');
        });
    });
});
