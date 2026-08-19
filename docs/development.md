# Development Setup

These steps describe the Phase 1 macOS development environment.

## Current toolchain

- macOS 26.5.2, Apple Silicon (`arm64`)
- System Python 3.14.5 (`python3`); project backend Python 3.12.14 (Homebrew `python@3.12`)
- Node.js 20.20.1
- npm 10.8.2
- pnpm: not installed; npm is the selected JavaScript package manager
- Rust/Cargo 1.97.1 (Homebrew)
- Tauri CLI 2.11.4 and Tauri 2.11.5
- React 19.2.8
- TypeScript 7.0.2
- Vite 8.2.1
- Xcode Command Line Tools: `/Library/Developer/CommandLineTools`
- SQLite: Python's SQLite support with SQLAlchemy; no external service
- TTS: Kokoro, with model and voice assets managed separately from pip dependencies

## Python backend

From the repository root:

```zsh
python3 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r requirements.txt
```

The current workspace also contains a compatible `venv/` created during initial setup. New checkouts should use `.venv`; both names are ignored by Git.

To confirm the active interpreter:

```zsh
python --version
which python
```

The first run may need to download Kokoro's model and voice assets. Once dependencies and required model assets are present locally, the backend is designed to run without internet access.

## Frontend and Tauri

The React frontend is in `frontend/` and the Tauri shell is in `src-tauri/`. From the frontend directory:

```zsh
npm install
npm run build
npm run tauri dev
```

To build the launchable macOS application and Apple Silicon DMG:

```zsh
npm run package
```

The generated artifacts are under `src-tauri/target/release/bundle/`:

- `macos/EPUB Reader.app`
- `dmg/EPUB Reader_0.1.0_aarch64.dmg`

Copy the `.app` bundle to `/Applications/EPUB Reader.app` to launch it directly like a shipped macOS application. The current icon is generated from `src-tauri/app-icon.svg`; regenerate the icon assets with the Tauri icon command when the final brand mark is ready.

The Rust shell currently compiles with `cargo check` from `src-tauri/`. Full Xcode is not installed, but the Xcode Command Line Tools required for the current Rust build are available. Do not add frontend or Rust dependencies to `requirements.txt`.

Before the first Tauri bootstrap, install the current Tauri prerequisites for Apple Silicon, including Rust and the macOS Xcode Command Line Tools. Then record the installed Tauri, React, and TypeScript versions here and in the package manifests.

## Verification checklist

Before locking versions for a working implementation, verify on the target Mac:

1. `python -m pip install -r requirements.txt` completes successfully.
2. A representative EPUB parses correctly.
3. Kokoro generates audio locally.
4. Generated audio plays through the frontend/native player.
5. Playback-rate changes do not trigger synthesis again.
6. The application starts with network access disabled after models and dependencies are installed.

Only after these checks should minimum versions be tightened into tested constraints or a reproducible lock strategy.