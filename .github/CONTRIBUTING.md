# Contributing to Raddix

Welcome and thank you for your interest in contributing! We hope together to improve accessibility and usability on the web.
Before submitting your contribution, be sure to take a moment and read the following guidelines.

## Code of Conduct

We adopt the Contributor Covenant as  code of conduct, and we hope that project participants adhere to it.
You can read the full document [here.](/CODE_OF_CONDUCT.md)

## How to contribute

There are many ways to contribute to the project. Code is just one possible means of contribution.

- **Feedback**: Tell us what we're doing well or where we can improve.
- **Docs**: Update missing or fix existing documentation.
- **Issues**: Look for issues tagged with help wanted and/or good first issue.
- **Write**: Add features, suggest improvements, and bug fixed.

## Considerations

- `.storybook`: all storybook config files
- `assets`: files static of raddix
- `packages`: all packages of react hooks
- `tsconfig.base.json`: Typescript base configuration
- `tsconfig.json`: Paths configuration

## Pull Request Guide

Pull Requests are always welcome, but before working on a large change, it is best to open an issue first to discuss it with maintainers.

### Add a new feature

1. Fork the repository.

2. Clone the fork to your local machine add upstream remote.

```bash
git clone https://github.com/<your username>/raddix.git
cd primitives
git remote add upstream https://github.com/gdvu/raddix.git
```
3. Synchronize your local main branch with the upstream remote:

```bash
git checkout main
git pull upstream main
```

4. Install dependencoes with yarn

```bash
yarn install
```

5. Create a new branch related to your PR.

```bash
git switch -c feat/my-feature
```

6. Make changes, then commit and push to your forked repository

```bash
git push -u origin HEAD
```

7. Go to the repository and send your pull request to the main branch.

8. We will review your Pull Request and either merge it, request changes to it, or close it with an explanation.
