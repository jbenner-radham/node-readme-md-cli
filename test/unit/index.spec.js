import app from '../../lib/index.js';

const { any } = jasmine;

describe('app', function () {
    it('is a function', function () {
        expect(app).toEqual(any(Function));
    });

    it('returns a string', function () {
        expect(app()).toEqual(any(String));
    });

    describe('when passed a `pkg.name` property', function () {
        it('describes an npm install method', function () {
            const config = {
                pkg: {
                    name: '@example/package'
                }
            };

            expect(app(config)).toContain(`npm install ${config.pkg.name}`);
        });

        describe('when also passed a `preferDev: true` property', function () {
            it('describes an npm install dev method', function () {
                const config = {
                    pkg: {
                        name: '@example/package'
                    },
                    preferDev: true
                };

                expect(app(config)).toContain(`npm install --save-dev ${config.pkg.name}`);
            });
        });

        describe('when also passed a `pkg.preferGlobal: true` property', function () {
            it('describes an npm global install method', function () {
                const config = {
                    pkg: {
                        name: '@example/package',
                        preferGlobal: true
                    }
                };

                expect(app(config)).toContain(`npm install --global ${config.pkg.name}`);
            });
        });

        describe('when also passed `preferDev: true` and `pkg.preferGlobal: true` properties', function () {
            it('describes an npm install dev method', function () {
                const config = {
                    pkg: {
                        name: '@example/package',
                        preferGlobal: true
                    },
                    preferDev: true
                };

                expect(app(config)).toContain(`npm install --save-dev ${config.pkg.name}`);
            });
        });

        describe('when also passed `pkg.scripts.test` properties', function () {
            it('describes an npm test method', function () {
                const config = {
                    pkg: {
                        name: '@example/package',
                        scripts: {
                            test: 'jest'
                        }
                    },
                    preferYarn: true
                };

                expect(app(config)).toContain('npm test');
            });
        });
    });

    describe('when passed `pkg.name` and `preferYarn: true` properties', function () {
        it('describes a yarn install method', function () {
            const config = {
                pkg: {
                    name: '@example/package'
                },
                preferYarn: true
            };

            expect(app(config)).toContain(`yarn add ${config.pkg.name}`);
        });

        describe('when also passed a `preferDev: true` property', function () {
            it('describes an yarn install dev method', function () {
                const config = {
                    pkg: {
                        name: '@example/package'
                    },
                    preferDev: true,
                    preferYarn: true
                };

                expect(app(config)).toContain(`yarn add --dev ${config.pkg.name}`);
            });
        });

        describe('when also passed `pkg.scripts.test` properties', function () {
            it('describes a yarn test method', function () {
                const config = {
                    pkg: {
                        name: '@example/package',
                        scripts: {
                            test: 'jest'
                        }
                    },
                    preferYarn: true
                };

                expect(app(config)).toContain('yarn test');
            });
        });
    });
});
