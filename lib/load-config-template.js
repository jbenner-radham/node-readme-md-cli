const fs = require('fs');

module.exports = function loadConfigTemplate() {
    const template = require.resolve('../template/config.yml');

    return fs.readFileSync(template).toString();
};
