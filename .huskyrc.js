/** @see https://github.com/typicode/husky#readme */
module.exports = {
    hooks: {
        'pre-commit': 'lint-staged',
        'pre-push': 'npm test'
    }
};
