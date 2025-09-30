import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import app from '../../lib/index.js';
import process from 'node:process';
import { temporaryDirectory } from 'tempy';

const cwd = process.cwd();

describe('app', () => {
    beforeAll(() => {
       process.chdir(temporaryDirectory());
    });

    afterAll(() => {
        process.chdir(cwd);
    });

    it('is a function', () => {
        expect(app).toBeTypeOf('function');
    });

    it('returns a string', () => {
        expect(app()).toBeTypeOf('string');
    });

    describe('when passed a `pkg.name` property', () => {
        it('describes an npm install method', () => {
            const config = {
                pkg: {
                    name: '@example/package'
                }
            };

            expect(app(config)).toContain(`npm install ${config.pkg.name}`);
        });

        describe('when also passed a `preferDev: true` property', () => {
            it('describes an npm install dev method', () => {
                const config = {
                    pkg: {
                        name: '@example/package'
                    },
                    preferDev: true
                };

                expect(app(config)).toContain(`npm install --save-dev ${config.pkg.name}`);
            });
        });

        describe('when also passed a `pkg.preferGlobal: true` property', () => {
            it('describes an npm global install method', () => {
                const config = {
                    pkg: {
                        name: '@example/package',
                        preferGlobal: true
                    }
                };

                expect(app(config)).toContain(`npm install --global ${config.pkg.name}`);
            });
        });

        describe('when also passed `preferDev: true` and `pkg.preferGlobal: true` properties', () => {
            it('describes an npm install dev method', () => {
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

        describe('when also passed `pkg.scripts.test` properties', () => {
            it('describes an npm test method', () => {
                const config = {
                    pkg: {
                        name: '@example/package',
                        scripts: {
                            test: 'jest'
                        }
                    }
                };

                expect(app(config)).toContain('npm test');
            });
        });
    });

    describe('when passed `pkg.name` and `pkg.engines.yarn` properties', () => {
        it('describes a yarn install method', () => {
            const config = {
                pkg: {
                    engines: { yarn: '*' },
                    name: '@example/package'
                }
            };

            expect(app(config)).toContain(`yarn add ${config.pkg.name}`);
        });

        describe('when also passed a `preferDev: true` property', () => {
            it('describes an yarn install dev method', () => {
                const config = {
                    pkg: {
                        engines: { yarn: '*' },
                        name: '@example/package'
                    },
                    preferDev: true
                };

                expect(app(config)).toContain(`yarn add --dev ${config.pkg.name}`);
            });
        });

        describe('when also passed `pkg.scripts.test` properties', () => {
            it('describes a yarn test method', () => {
                const config = {
                    pkg: {
                        engines: { yarn: '*' },
                        name: '@example/package',
                        scripts: {
                            test: 'jest'
                        }
                    }
                };

                expect(app(config)).toContain('yarn test');
            });
        });
    });
});
