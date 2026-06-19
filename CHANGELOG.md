# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.6] - 2026-06-19

### Changed
- **MAJOR: Migrated from Gulp to Vite** — Complete modernization of the build toolchain
  - Replaced Gulp with Vite 6.x for significantly faster builds and hot module replacement
  - Updated npm scripts: `dev`, `build`, and `preview` now use Vite instead of Gulp tasks
  - Created `vite.config.js` with proper root, publicDir, and build output configuration
  - Removed all Gulp-related dependencies (gulp, gulp-watch, gulp-stylus, gulp-concat, gulp-uglify, gulp-notify)
  - Removed `gulpfile.js` (no longer needed)

### Added
- **Custom hostname support** — Dev server now supports custom hostnames via `vite.config.js` configuration
  - Useful for Docker development and cross-origin testing scenarios
- **Node version pinning** — Added `.nvmrc` file pinning Node 22 for consistent development environments

### Updated
- Stylus upgraded to 0.64.0 (latest)
- Vite configured to 6.1.6
- `package.json` — Updated main field from `gulpfile.js` to `source/index.html`
- CSS and JavaScript asset links updated to reference precompiled files correctly

### Removed
- `gulpfile.js` — Replaced by Vite configuration
- `pnpm-lock.yaml` from repository (added to `.gitignore` for cleaner repo)
- Modern-normalize dependency — Returned to custom `_normalize.styl` for smaller footprint
- CSS build and compiled styles from version control
- Browser-specific hacks and old IE support code
- `!important` flags from CSS (not needed with modern CSS approaches)

### Fixed
- Vite dev server now accessible from custom Docker hostnames
- pnpm lock file handling (approves builds on pnpm.yaml)

### Improved
- **CSS Reorganization** — Cleaned up unused styles and added responsive sizing for default `<p>` and `<h>` tags
- **Modern CSS** — Updated to modern CSS variable syntax
- Faster development feedback with Vite's instant HMR instead of file watching
- Significantly reduced build times and dev server startup

## [1.1.5] and earlier

See git history for details on earlier releases.
