# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [v1.2.1] - 2020/11/5
### Fixed
- Bug where default seed wouldn't save/load
- Various styling issues

## [v1.2.0] - 2020/11/5
### Added
- Add seeded runs

## [v1.1.0] - 2020/10/23
### Added
- Automatic top score saving (saves locally)
- Settings
  - New game on mistake - when `on`, queues a new game when a mistake is made
  - Reset data button
- About screen
  - Version
  - Credits
  - Source
  - Changelog
  - Feedback form
  - Acknowledgements

### Changed
- Converted project to use TypeScript and Vuex for central state
- Verbiage of scoreboards for clarity
  - "Total" → "Overall"
  - "First click" → "1-10"

### Fixed
- Bug where identical times would result in duplicate highlights in the scores list
- Bug where 1-10 timer wouldn't reset upon making a mistake
