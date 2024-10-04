readme-md-cli
=============
[![CI Status](https://img.shields.io/github/actions/workflow/status/jbenner-radham/node-readme-md-cli/ci.yaml?branch=main&style=flat-square)](https://github.com/jbenner-radham/node-readme-md-cli/actions/workflows/ci.yaml)
[![npm](https://img.shields.io/npm/v/readme-md-cli.svg?style=flat-square)](https://www.npmjs.com/package/readme-md-cli)
[![Node.js](https://img.shields.io/node/v/readme-md-cli.svg?style=flat-square)](https://nodejs.org/)
[![License](https://img.shields.io/github/license/jbenner-radham/node-readme-md-cli.svg?style=flat-square)](LICENSE)

Automatically generate a readme for your project from the CLI.

Install
-------
```sh
yarn global add readme-md-cli # Or alternatively: `npm install --global readme-md-cli`
```

Usage
-----
```sh-session
$ readme-md --help

  Automatically generate a readme for your project from the CLI.

  Usage
      $ readme-md [init]

  Options
      --help, -h       Display this message.
      --version, -v    Display the application version.

  When invoked with the "init" sub-command a project level runtime
  configuration is initialized.
```

For more detailed information see the [doc directory](doc/) or view the [project's config directory](.config/readme-md/) for example usage.
For example output this `README.md` is entirely self generated by this package.

Testing
-------
```sh
yarn test # Or alternatively: `npm test`
```

See Also
--------
- [readme-md @ npm](https://www.npmjs.com/package/readme-md)

License
-------
The MIT License. See the [license file](LICENSE) for details.
