# Shift Scheduler

A full-stack shift scheduling application built as a monorepo with React frontend and Express backend.

## Monorepo Structure

This project uses npm workspaces to manage multiple packages in a single repository:

```
shift-scheduler/
├── app/              # React frontend (Vite + TypeScript)
├── backend/          # Express backend (Node.js + TypeScript)
├── lib/              # Shared utilities, types, and constants
├── package.json      # Root workspace configuration
├── tsconfig.json     # Shared TypeScript configuration
└── README.md         # This file
```

### Workspaces

- **app** - React application built with Vite
  - Port: 3000
  - Technology: React 18, TypeScript, Vite

- **backend** - Express API server
  - Port: 3001
  - Technology: Express, TypeScript, Node.js

- **lib** - Shared code library
  - Common types, utilities, and constants used by both app and backend

## Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

Install all dependencies for all workspaces from the root:

```bash
npm install
```

This will install dependencies for the root project and all workspaces (app, backend, lib).

### Development

#### Run all services concurrently

```bash
npm run dev
```

This will start both the backend server (port 3001) and frontend app (port 3000).

#### Run individual workspaces

Run the frontend only:
```bash
npm run dev:app
```

Run the backend only:
```bash
npm run dev:backend
```

### Building

Build all workspaces:
```bash
npm run build
```

Build individual workspaces:
```bash
npm run build:app      # Build frontend
npm run build:backend  # Build backend
npm run build:lib      # Build shared library
```

## Development Workflow

### Making Changes to Shared Code (lib)

1. Edit files in `lib/src/`
2. The changes are automatically available to `app` and `backend` through workspace linking
3. For TypeScript changes, you may need to rebuild: `npm run build:lib`

### Adding Dependencies

To add a dependency to a specific workspace:

```bash
# Add to frontend
npm install <package> --workspace=app

# Add to backend
npm install <package> --workspace=backend

# Add to lib
npm install <package> --workspace=lib

# Add to root (dev dependencies like TypeScript)
npm install <package> --save-dev
```

### Cross-Workspace Imports

The `app` and `backend` workspaces can import from `lib`:

```typescript
import { getAppName, User, Shift } from '@shift-scheduler/lib'
```

## Project Features

- **TypeScript** - Type safety across the entire stack
- **Monorepo** - Shared code between frontend and backend
- **Hot Reload** - Fast development with Vite (frontend) and tsx (backend)
- **Modern Stack** - React 18, Express 4, latest TypeScript

## Scripts Reference

| Command | Description |
|---------|-------------|
| `npm install` | Install all dependencies |
| `npm run dev` | Run both frontend and backend in development mode |
| `npm run dev:app` | Run frontend only |
| `npm run dev:backend` | Run backend only |
| `npm run build` | Build all workspaces |
| `npm run build:app` | Build frontend |
| `npm run build:backend` | Build backend |
| `npm run build:lib` | Build shared library |
| `npm run clean` | Remove all build outputs and node_modules |

## Learn More

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vite.dev/)
- [Express Documentation](https://expressjs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [npm Workspaces](https://docs.npmjs.com/cli/using-npm/workspaces)