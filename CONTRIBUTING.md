# Contributing

Thanks for helping improve EPUB Reader.

## Before you start

Please read [docs/architecture.md](docs/architecture.md) and [docs/development.md](docs/development.md). Keep changes focused and preserve the separation between the React UI, Tauri native layer, Python processing, and local persistence.

## Development rules

- Use Python 3.12 for the backend environment.
- Keep Python dependencies in `requirements.txt` or `requirements-dev.txt`.
- Keep frontend dependencies in `frontend/package.json`.
- Keep Rust/Tauri dependencies in `src-tauri/Cargo.toml`.
- Do not commit `.venv`, `venv`, `node_modules`, build output, local databases, EPUB files, generated audio, or model assets.
- Add or update tests for backend behavior and parsing logic.
- Treat EPUB content as untrusted input.
- Do not add cloud services, analytics, accounts, or DRM workarounds without a documented design decision.

## Validation

Run the checks relevant to your change:

```zsh
venv/bin/python -m pytest backend/tests -q
cd frontend && npm run build
cd ../src-tauri && cargo check
```

For user-facing changes, also run the packaged macOS app and verify the affected workflow manually.

## Pull requests

Explain the user-facing change, design impact, testing performed, and any macOS-specific limitations. Keep unrelated formatting or dependency updates out of the same pull request.
