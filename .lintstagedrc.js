/** @see https://github.com/okonet/lint-staged#readme */
module.exports = {
    '*.js': ['npx eslint --fix', 'git add'],
    'package.json': ['sort-package-json', 'git add']
};
