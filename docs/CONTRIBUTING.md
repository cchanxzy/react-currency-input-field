# Contributing

Thanks for being willing to contribute!

- [Contributing](#contributing)
  - [Project setup](#project-setup)
  - [Prerequisites](#prerequisites)
    - [Node.js \& nvm](#nodejs--nvm)
    - [Corepack](#corepack)
  - [Install](#install)
  - [Start](#start)
  - [Commands](#commands)
  - [Committing and Pushing changes](#committing-and-pushing-changes)
    - [Commit messages](#commit-messages)
  - [Pull request](#pull-request)
  - [Help needed](#help-needed)

## Project setup

1. Fork and clone the repo
2. Create a branch for your PR with `git checkout -b <type>/<short-kebab-description>`, where `<type>` is a Conventional Commits type such as `feat`, `fix`, `docs` or `chore` (for example `fix/demo-side-effects`)

> Tip: Keep your `main` branch pointing at the original repository and make pull
> requests from branches on your fork. To do this, run:
>
> ```bash
> git remote add upstream https://github.com/cchanxzy/react-currency-input-field.git
> git fetch upstream
> git branch --set-upstream-to=upstream/main main
> ```
>
> This will add the original repository as a "remote" called "upstream," Then
> fetch the git information from that remote, then set your local `main` branch
> to use the upstream main branch whenever you run `git pull`. Then you can make
> all of your pull request branches based on this `main` branch. Whenever you
> want to update your version of `main`, do a regular `git pull`.

## Prerequisites

### Node.js & nvm

We use [nvm](https://github.com/nvm-sh/nvm) to ensure everyone runs the same Node.js version.

Follow instructions to install NVM via their [documentation](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating).

```bash
# Check you have NVM installed:
nvm --version

# Use project Node.js version from .nvmrc
nvm install
nvm use
```

### Corepack

Corepack comes bundled with Node.js (>=16.9).
It ensures the correct package manager version is used across machines.

```bash
# Enable Corepack (one-time)
corepack enable

# Update Corepack shims
corepack prepare
```

## Install

Run `pnpm i` to install dependencies

## Start

To start the examples page locally, run `pnpm start`.

This will open the page in `http://localhost:1234/`.

## Commands

| Command                     | What it does                                                                                           |
| --------------------------- | ------------------------------------------------------------------------------------------------------ |
| `pnpm check`                | Everything CI checks: Prettier, ESLint, the type checks and the unit tests                             |
| `pnpm test`                 | Unit tests (Jest). Add a pattern to run some of them, for example `pnpm test CurrencyInput-decimals`   |
| `pnpm lint`                 | ESLint, with zero warnings allowed                                                                     |
| `pnpm typecheck`            | Type-checks the library, the unit tests, and the demo, e2e tests and tool configs                      |
| `pnpm build`                | Builds the package into `dist/` (ESM and CJS bundles plus type declarations). See [BUILD.md](BUILD.md) |
| `pnpm exec playwright test` | End-to-end tests. Builds the production demo and serves it on port 1234 first                          |

`package.json` lists the rest.

## Committing and Pushing changes

Before you push, run:

```bash
pnpm check
```

It runs Prettier, ESLint, the type checks and the unit tests. Follow the conventions in [CODING_STANDARDS.md](CODING_STANDARDS.md).

A pre-commit hook fixes formatting and lint problems on the files you stage, and runs the type checks.

### Commit messages

PRs are squash-merged, so the **PR title** becomes the whole commit on `main`. It matters most:

- It must be a [Conventional Commit](https://www.conventionalcommits.org/), for example `fix(format-value): handle negative prefix`. CI checks it.
- The scope is optional. Allowed scopes: `component`, `format-value`, `clean-value`, `utils`, `types`, `examples`, `deps`, `deps-dev`, `release`. Use a scope for changes to the library or demo; tooling changes don't need one (`ci: …`, `build: …`, `chore: …`).
- Don't put `!` in the title, because commitlint rejects it. If your change is breaking, say so in the PR description. The maintainer adds a `BREAKING CHANGE:` footer to the squash commit message when merging, which is what makes semantic-release publish a major version.

Commits on your branch aren't checked in CI and don't reach `main`, but the local commit-msg hook still checks them. Don't add attribution lines such as `Co-authored-by:` trailers or "Generated with" lines; the hook rejects them.

## Pull request

The pull request template lists what to check before you open the PR.

AI tools are welcome, but you're responsible for what they write. Review and test all AI-generated code manually before you open the PR, the same as code you wrote yourself.

If you are a first time contributor for this project, your PR will not run the checks required in CI.

Please mention @cchanxzy in a comment on the pull request, and I will enable the checks to run for the PR.

## Help needed

Please checkout the [the open issues](https://github.com/cchanxzy/react-currency-input-field/issues) if you would like to help.
