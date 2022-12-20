import loadConfigTemplate from '../../lib/load-config-template.js';
import { temporaryDirectory } from 'tempy';

const { any } = jasmine;
const originalCwd = process.cwd();

describe('loadConfigTemplate', function () {
    beforeEach(function () {
        process.chdir(temporaryDirectory());
    });

    afterAll(function () {
        process.chdir(originalCwd);
    });

    it('is a function', function () {
        expect(loadConfigTemplate).toEqual(any(Function));
    });

    it('returns a string', function () {
        expect(loadConfigTemplate()).toEqual(any(String));
    });
});
