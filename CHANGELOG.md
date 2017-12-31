Changelog
=========
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

[0.8.0] - 2017-12-31
--------------------
### Added
- Node version badge rendering.
- Travis-CI badge rendering.

[0.7.0] - 2017-12-26
--------------------
### Added
- Initial badge rendering.

[0.6.1] - 2017-12-26
--------------------
### Fixed
- Fixed some outdated text in the readme's "Usage" section.

[0.6.0] - 2017-12-23
--------------------
### Added
- Implemented `preferGlobal` handling.

### Changed
- Renamed the runtime config file from `.config/readme-md.yml` to `.config/readme-md/config.yml`.

[0.5.1] - 2017-12-17
--------------------
### Fixed
- Fixed missing `fs-extra` runtime error.

[0.5.0] - 2017-12-17
--------------------
### Added
- Added prioritized `.config/readme-md/sections/usage.md` inclusion.
- Documented the aforementioned "Usage" section inclusion.

[0.4.0] - 2017-12-10
--------------------
### Added
- Added [Yarn](https://yarnpkg.com/) support.

[0.3.0] - 2017-10-01
--------------------
### Added
- Added expanded documentation in the `doc/` directory.
- Implemented initial project level config via `.config/readme-md.yml` file.

[0.2.0] - 2017-10-01
--------------------
### Added
- Added automatic `example/cli/usage.md` inclusion.
- Added project level `.config/readme-md.json` parsing.
- Automatically linkifies the license file if `LICENSE`, `LICENSE.md`, or `LICENSE.txt` are present.

### Changed
- Refactor to allow Node.js `>=6.11` environments.

0.1.0 - 2017-07-21
------------------
### Added
- Initial release.

[0.8.0]: https://github.com/jbenner-radham/node-readme-md-cli/compare/v0.7.0...v0.8.0
[0.7.0]: https://github.com/jbenner-radham/node-readme-md-cli/compare/v0.6.1...v0.7.0
[0.6.1]: https://github.com/jbenner-radham/node-readme-md-cli/compare/v0.6.0...v0.6.1
[0.6.0]: https://github.com/jbenner-radham/node-readme-md-cli/compare/v0.5.1...v0.6.0
[0.5.1]: https://github.com/jbenner-radham/node-readme-md-cli/compare/v0.5.0...v0.5.1
[0.5.0]: https://github.com/jbenner-radham/node-readme-md-cli/compare/v0.4.0...v0.5.0
[0.4.0]: https://github.com/jbenner-radham/node-readme-md-cli/compare/v0.3.0...v0.4.0
[0.3.0]: https://github.com/jbenner-radham/node-readme-md-cli/compare/v0.2.0...v0.3.0
[0.2.0]: https://github.com/jbenner-radham/node-readme-md-cli/compare/v0.1.0...v0.2.0
