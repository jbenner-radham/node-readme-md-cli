'use strict';

const { any } = jasmine;
const loadConfigTemplate = require('../lib/load-config-template');
const tempy = require('tempy');

describe('loadConfigTemplate', function () {
    beforeEach(function () {
        process.chdir(tempy.directory());
    });

    it('is a function', function () {
        expect(loadConfigTemplate).toEqual(any(Function));
    });

    it('returns a string', function () {
        expect(loadConfigTemplate()).toEqual(any(String));
    });
});
