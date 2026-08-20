# Security Policy

## Supported versions

This project is in early development. Security fixes are applied to the latest version on the default branch.

## Reporting a vulnerability

Please do not open a public issue for a suspected vulnerability. Report it privately through the repository's security advisory mechanism once the public repository is created. Include:

- Affected version or commit
- macOS and architecture
- Reproduction steps or a minimal proof of concept
- Impact assessment
- Any suggested mitigation

Do not include personal EPUB files, private paths, credentials, or other sensitive data in a report.

## Security boundaries

EPUB files are untrusted input. The application must sanitize EPUB HTML, avoid executing EPUB JavaScript, validate filesystem paths, and keep the Python service bound to loopback. The application must not bypass DRM, lending controls, or source access restrictions.
