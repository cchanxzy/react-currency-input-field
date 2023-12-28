# Contributing

Thanks for being willing to contribute!

## Project setup

1. Fork and clone the repo
2. Run `yarn` to install dependencies
3. Create a branch for your PR with `git checkout -b pr/your-branch-name`

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

## Start

To start the examples page locally, run `yarn start`.

This will open the page in `http://localhost:1234/`.

## Committing and Pushing changes

Please make sure to run the tests before you commit your changes.

## Pull request

If you are a first time contributor for this project, your PR will not run the checks required in CI. Please mention @cchanxzy in a comment on the pull request, and I will enable the checks to run for the PR.

## Help needed

Please checkout the [the open issues](https://github.com/cchanxzy/react-currency-input-field/issues)
