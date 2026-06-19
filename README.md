# pandora-boilerplate

A modern **HTML5 Boilerplate** to start your next project with a simple yet powerful development environment.

This boilerplate provides a clean separation between your **development files** (in the `source` folder) and **production-ready output** (in the `build` folder). It uses [Stylus](http://stylus-lang.com) for CSS preprocessing and [Vite](https://vitejs.dev) as the modern build tool and dev server.

## Prerequisites

- **Node.js 22+** (see `.nvmrc` for the pinned version)
- **npm** or **pnpm** (pnpm recommended for faster installs)

## Getting Started

1. Install dependencies:
```bash
npm install
# or
pnpm install
```

2. Start the development server:
```bash
npm run dev
# or
pnpm dev
```

The dev server will be available at `http://localhost:5173` by default.

## Development

The development workflow is streamlined with Vite's instant HMR (Hot Module Replacement):

- **CSS Compilation**: Place your `.styl` files in `source/assets/css/` and they'll be automatically compiled to CSS
- **JavaScript**: Your scripts in `source/assets/javascript/` are bundled and optimized
- **Live Reload**: Changes are reflected instantly in the browser

### Available Scripts

- `npm run dev` — Start the development server with hot reload
- `npm run build` — Build the project for production (output in `build/` folder)
- `npm run preview` — Preview the production build locally

### Custom Hostnames

You can access the dev server from custom hostnames by configuring them in `vite.config.js`. This is useful for testing cross-origin scenarios or accessing the dev server from Docker containers.

## Production Build

When ready to deploy, generate the optimized production build:

```bash
npm run build
```

This will create a `build` folder containing all necessary files ready for deployment.

## Project Structure

```
pandora-boilerplate/
├── source/              # Development files
│   ├── assets/
│   │   ├── css/        # Stylus files and compiled CSS
│   │   └── javascript/ # JavaScript files
│   └── index.html      # Main HTML entry point
├── build/              # Production build output (generated)
├── vite.config.js      # Vite configuration
└── package.json        # Project metadata and scripts
```

## Tech Stack

- **Build Tool**: [Vite](https://vitejs.dev) 6.x
- **CSS Preprocessor**: [Stylus](http://stylus-lang.com) 0.64
- **Runtime**: Node.js 22+

## License

ISC — See package.json for more details