# AGENTS.md

Guidance for AI coding tools (Claude Code, Codex, Cursor, Copilot and others) working in this repository.

This file points to the docs that hold the details, so it doesn't go out of date. When something changes, update the doc that owns it, not this file.

React Currency Input Field is a zero-dependency React `<input>` component for formatting currency and number values.

## Read first

- [README.md](README.md): what the component does, its props and usage.
- [docs/CONTRIBUTING.md](docs/CONTRIBUTING.md): setup, commands, branch names, commit messages and pull requests.
- [docs/CODING_STANDARDS.md](docs/CODING_STANDARDS.md): code conventions, and how each one is checked.
- [docs/CURRENCY_BEHAVIOR.md](docs/CURRENCY_BEHAVIOR.md): which currency formats are supported, and the standards each rule comes from.
- [docs/BUILD.md](docs/BUILD.md): how `pnpm build` lays out `dist/` and the `exports` field, and why. Read it before changing the build.

## Where things are

- `src/index.ts`: the public API. Anything exported here is published.
- `src/components/`: the component and its props types.
- `src/components/utils/`: pure formatting and parsing functions.
- `__tests__/` folders next to the code: unit tests. `tests/`: Playwright end-to-end tests.
- `src/examples/`: the demo page.

## Before finishing

- Run `pnpm check`. It must pass.
- If you change a convention or a command, update the doc that owns it.
- Say what you tested and what you didn't. A person manually reviews and tests all AI-generated code before it's merged.
- Don't add `Co-authored-by` trailers or "Generated with" lines to commits. The commit-msg hook rejects them.
