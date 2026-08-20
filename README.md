# EPUB Reader

A local-first macOS desktop reader and audiobook player for EPUB books. The project is designed to keep personal books and generated audio on the user's Mac, with a native Tauri shell, React/TypeScript UI, and Python processing backend.

> Early development: the desktop shell and packaging are working, while EPUB library management, reading, and local audiobook features are being implemented incrementally.

## Features in progress

- Native macOS application shell with a branded icon
- React and TypeScript reader interface
- Local FastAPI backend boundary
- Python 3.12 virtual environment
- SQLite persistence plan
- Kokoro local TTS provider plan
- Offline-first application architecture

## Technology

- Tauri 2 and Rust
- React 19, TypeScript 7, Vite 8, npm
- Python 3.12, FastAPI, SQLAlchemy, EbookLib, Kokoro
- SQLite for local application data

See [docs/architecture.md](docs/architecture.md) for architectural decisions and [docs/development.md](docs/development.md) for macOS setup and packaging instructions.

## Development setup

Requirements:

- macOS on Apple Silicon or Intel
- Python 3.12
- Node.js 20 or newer
- npm
- Rust and Cargo
- Xcode Command Line Tools

Create the Python environment from the repository root:

```zsh
/opt/homebrew/bin/python3.12 -m venv .venv
source .venv/bin/activate
python -m pip install --upgrade pip
python -m pip install -r requirements-dev.txt
```

Install frontend dependencies and build:

```zsh
cd frontend
npm install
npm run build
```

Run the desktop app in development:

```zsh
npm run tauri dev
```

Build the macOS application and DMG:

```zsh
npm run package
```

The production artifacts are generated under `src-tauri/target/release/bundle/`. Model and voice assets used by Kokoro may require a one-time download during setup; normal reading and playback are intended to work offline after installation.

## Privacy and content safety

The application is intended to process EPUBs locally. It does not require a cloud account or upload books. EPUB files are untrusted input and must be sanitized before rendering. Do not use the application to bypass DRM, lending controls, or access restrictions.

## License

The application source is released under the [MIT License](LICENSE). Books, cover art, TTS models, and other imported content remain subject to their own licenses and terms.
