const fs = require('fs-extra');
const isFile = require('./is-file');
const path = require('path');
const pathExists = require('./path-exists');
const yaml = require('js-yaml');

const isDir = (filePath) => fs.statSync(filePath).isDirectory();

module.exports = class Config {
    static get dirName() {
        return '.config';
    }

    static get fileName() {
        return 'readme-md.yml';
    }

    static get filePath() {
        return path.join(
            process.cwd(),
            Config.dirName,
            Config.fileName
        );
    }

    static dirExists() {
        const dirPath = path.join(process.cwd(), Config.dirName);

        return (pathExists(dirPath) && isDir(dirPath));
    }

    static fileExists() {
        return (pathExists(Config.filePath) && isFile(Config.filePath));
    }

    static read() {
        return yaml.load(
            fs.readFileSync(Config.filePath).toString()
        );
    }
};
