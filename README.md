readme-md-cli
=============
[![npm](https://img.shields.io/npm/v/readme-md-cli.svg?style=flat-square)](https://www.npmjs.com/package/readme-md-cli)
[![node](https://img.shields.io/node/v/readme-md-cli.svg?style=flat-square)](https://nodejs.org/)
[![build](https://img.shields.io/travis/jbenner-radham/node-readme-md-cli.svg?style=flat-square)](https://travis-ci.org/jbenner-radham/node-readme-md-cli)
[![license](https://img.shields.io/github/license/jbenner-radham/node-readme-md-cli.svg?style=flat-square)](LICENSE)

Automatically generate a readme for your project from the CLI.

Install
-------
```sh
$ yarn global add readme-md-cli # Or alternatively: `npm install --global readme-md-cli`
```

Usage
-----
```sh
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

For more detailed information see the [doc directory](doc/). Or view the
[project's config directory](.config/readme-md/) for example usage.

For example output, this `README.md` is entirely self generated by this package.

Testing
-------
```sh
$ yarn test # Or alternatively: `npm test`
```

See Also
--------
- [readme-md @ npm](https://www.npmjs.com/package/readme-md)

License
-------
The MIT License (Expat). See the [license file](LICENSE) for details.
