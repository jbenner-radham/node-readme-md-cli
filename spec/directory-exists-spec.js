'use strict';

const {any} = jasmine;
const directoryExists = require('../lib/directory-exists');
const path = require('path');

describe('directoryExists', function () {
    it('is a function', function () {
        expect(directoryExists).toEqual(any(Function));
    });

    it('returns a Boolean value', function () {
        expect(directoryExists()).toEqual(any(Boolean));
    });

    it('returns `true` when passed a path that does exist', function () {
        expect(directoryExists(__dirname)).toBe(true);
    });

    it('returns `false` when passed a path that does not exist', function () {
        const doesNotExist = path.resolve(`${__dirname}/path-dne`);

        expect(directoryExists(doesNotExist)).toBe(false);
    });
});
