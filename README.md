# Reitti Documentation

[![Build and Deploy](https://github.com/dedicatedcode/reitti-documentation/actions/workflows/build-deploy.yml/badge.svg)](https://github.com/dedicatedcode/reitti-documentation/actions/workflows/build-deploy.yml)

This repository contains the documentation for [Reitti](https://www.dedicatedcode.com/projects/reitti/), a personal location tracking and analysis application.

You can find the online version of the Reitti documentation at <https://www.dedicatedcode.com/projects/reitti/latest/>

## Contents
- [Building Locally](#building-locally)
- [Versioning](#versioning)
- [Contribution Guidelines](#contribution-guidelines)
- [Deployment](#deployment)
- [Project Structure](#project-structure)
- [Technology Stack](#technology-stack)
- [About Reitti](#about-reitti)
- [Getting Help](#getting-help)
- [License](#license)

## Building Locally

This project uses (https://docs.astral.sh/uv/) for dependency management. To build the documentation locally:

```bash
# Install dependencies
uv sync

# Build the documentation
uv run mkdocs build

# Serve locally for preview
uv run mkdocs serve
```

The site will be available at `http://localhost:8000`.

## Versioning

This documentation uses (https://github.com/jimporter/mike) for versioning with [MkDocs](https://www.mkdocs.org/). The documentation is organized by branches:

- **`main`** - Contains the latest documentation, deployed as the current major version (4.0) with the `latest` alias
- **`v3`** - Contains the stable 3.x documentation

When viewing the documentation, you can switch between versions using the version selector in the header.

## Contribution Guidelines

If you are submitting documentation for the **current stable release**, submit it to the corresponding branch. For example, documentation for version 3.x would be submitted to the `v3` branch. Documentation intended for the next release should be submitted to the `main`
branch.

Every documentation page includes an "edit this page on github" link at the bottom for easy contributions.

## Deployment

Documentation is automatically built and deployed via GitHub Actions when changes are pushed to `main` or version branches (e.g., `v3`). The deployment process:

1. Builds the documentation using MkDocs
2. Deploys versioned documentation using mike
3. Syncs the built documentation to the server
4. Invalidates the CDN cache

See [`.github/workflows/build-deploy.yml`](.github/workflows/build-deploy.yml) for the complete build and deployment configuration.

## Project Structure

```
reitti-documentation/
├── docs/                    # Documentation source files
│   ├── about/              # About Reitti
│   ├── api/                # API documentation
│   ├── configurations/     # Configuration guides
│   ├── integrations/       # Integration guides
│   ├── memories/           # Memories feature
│   ├── usage/              # Usage guides
│   └── assets/             # CSS, JS, images
├── theme/                  # Custom MkDocs theme overrides
├── mkdocs.yml             # MkDocs configuration
├── pyproject.toml         # Python dependencies
└── .github/workflows/     # CI/CD pipelines
```

## Technology Stack

- **Documentation Generator:** [MkDocs](https://www.mkdocs.org/)
- **Theme:** (https://github.com/squidfunk/mkdocs-shadcn) with custom overrides
- **Versioning:** (https://github.com/jimporter/mike)
- **Plugins:**
    - `mkdocs-nav-weight` - Custom navigation ordering
    - `badges` - Badge support
    - `search` - Built-in search
    - `redirects` - URL redirection
- **Package Manager:** (https://docs.astral.sh/uv/)
- **CI/CD:** GitHub Actions
- **Deployment:** rsync to server + Cloudflare CDN cache invalidation
- **Python:** ≥ 3.12

## About Reitti

Reitti (Finnish for "route" or "path") is a comprehensive personal location tracking and analysis application. It helps you:

- Track your daily movements and locations
- Analyze travel patterns and statistics
- Create memories from your visits
- Integrate with various location sources (mobile apps, OwnTracks, Home Assistant, etc.)
- Maintain privacy-focused self-hosted deployment

The application is designed to be self-hosted, giving you full control over your location data.

## Getting Help

- **Documentation:** [Online Documentation](https://www.dedicatedcode.com/projects/reitti/latest/)
- **Issues:** [GitHub Issues](https://github.com/dedicatedcode/reitti-documentation/issues)
- **Source Code:** [Reitti Application](https://github.com/dedicatedcode/reitti)

## License

See the [LICENSE](LICENSE) file for details. This project uses the CC0 1.0 Universal license.