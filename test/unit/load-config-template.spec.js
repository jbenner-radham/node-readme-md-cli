import loadConfigTemplate from '../../lib/load-config-template.js';
import { temporaryDirectory } from 'tempy';

const { any } = jasmine;

describe('loadConfigTemplate', function () {
    beforeEach(function () {
        process.chdir(temporaryDirectory());
    });

    it('is a function', function () {
        expect(loadConfigTemplate).toEqual(any(Function));
    });

    it('returns a string', function () {
        expect(loadConfigTemplate()).toEqual(any(String));
    });
});
