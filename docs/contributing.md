# Contributing

If you’d like to contribute to the Observable CLI, here’s how. First clone the [git repo](https://github.com/observablehq/cli) and run [Yarn (1.x)](https://classic.yarnpkg.com/lang/en/docs/install/) to install dependencies:

```sh
git clone git@github.com:observablehq/cli.git
cd cli
yarn
```

Next start the local preview server:

```sh
yarn dev
```

Lastly visit <http://127.0.0.1:3000>.

The local preview server restarts automatically if you edit any of the TypeScript files, though you may need to reload. The default page is [docs/index.md](https://github.com/observablehq/cli/blob/main/docs/index.md?plain=1); if you edit that file and save changes, the live preview in the browser will automatically update.

To generate the static site:

```sh
yarn build
```

This creates the `dist` folder. View the site using your preferred web server, such as:

```sh
http-server dist
```

This documentation site is built on GitHub using the Observable CLI; see the [deploy workflow](https://github.com/observablehq/cli/blob/main/.github/workflows/deploy.yml). Please open a pull request if you’d like to contribute to the documentation or to CLI features. Contributors are expected to follow our [code of conduct](https://github.com/observablehq/.github/blob/master/CODE_OF_CONDUCT.md). 🙏

## Releasing

(Note: This documentation is for Observable maintainers.) To release a new version of the CLI, first update the [package.json](https://github.com/observablehq/cli/blob/main/package.json) file by following the standard process for committing code changes:

1. Create a new branch.
2. Edit the `version` field in the [package.json](https://github.com/observablehq/cli/blob/main/package.json) file as desired.
3. Commit your change to your branch.
4. Push your branch up to GitHub.
5. Open a pull request and ask for a review.
6. Once approved, merge your pull request to the `main` branch.

Once the above is done, you can publish the release via GitHub:

1. Go to [**Draft a new release**](https://github.com/observablehq/cli/releases/new).
2. Under **Choose a tag**, enter the new version with a `v` *e.g.* `v0.0.5`.
3. Click **Create new tag: v0.0.5**.
4. Leave the **Target** as `main`.
5. Click **Publish release**.

That’s it! The [publish action](https://github.com/observablehq/cli/actions/workflows/publish.yml) will take care of the rest.