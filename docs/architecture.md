# EPUB Reader Architecture

## Phase 1 decisions

| Area | Decision | Current state |
| --- | --- | --- |
| Desktop shell | Tauri 2.11.5 | Rust shell scaffolded under `src-tauri/` |
| Frontend | React 19.2.8 + TypeScript 7.0.2, npm | Vite 8.2.1 and Tauri CLI 2.11.4; production build passes |
| Backend | Local FastAPI process | Health endpoint scaffolded; Python dependencies are described in `requirements.txt` |
| Database | SQLite through SQLAlchemy 2 | No external database service |
| TTS engine | Kokoro, behind a provider interface | Selected for naturalness and voice availability; model assets are installed separately |
| Audio playback | Browser/native audio player | Generate audio once; playback speed changes do not regenerate TTS |

## TTS decision

Kokoro is the initial production engine. It provides a stronger naturalness and voice-selection baseline for reading long-form EPUB text, and its PyTorch runtime can use CPU or Apple Silicon acceleration where the installed build supports it. The main tradeoff is a larger ML installation and a separately managed model/voice asset.

Piper was evaluated as the leaner alternative: it is fast, CPU-friendly, and simpler to operate, but its voice quality and voice selection are more dependent on the chosen ONNX voice model. Piper is not installed in the MVP environment so the project does not carry two complete TTS stacks.

The backend must expose an application-owned TTS interface such as `TTSProvider.synthesize(text, voice, output_path)`. API routes and EPUB processing depend on that interface, never on Kokoro imports directly. A future Piper provider can then be added without changing the reader workflow.

Kokoro's transitive runtime dependencies are installed by its package metadata. CUDA-specific packages are not intentionally added; the target is macOS on Apple Silicon, using the platform-compatible PyTorch distribution selected by the installer.

## Audio pipeline

The backend synthesizes a requested text segment to an audio file once. The frontend/native player controls rate changes such as 1.0x, 1.25x, and 1.5x at playback time. `pydub` is retained only for operations that genuinely require audio manipulation or conversion; routine playback does not transcode the generated file.

## Native capabilities

Native folder picking, application data directories, and macOS integration belong to Tauri plugins and Rust configuration. The Python backend should not display native macOS dialogs.

## Dependency boundaries

- Python dependencies belong only in `requirements.txt`.
- React, TypeScript, Tauri frontend packages, and JavaScript tooling belong in npm manifests and lockfiles.
- Rust and Tauri dependencies belong in `src-tauri/Cargo.toml` and `Cargo.lock`.