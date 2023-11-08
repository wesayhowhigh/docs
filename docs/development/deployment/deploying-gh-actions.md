---
sidebar_position: 2
sidebar_label: Deploying with GH Actions
---

# Deploying with GitHub Actions

Since October 2023, most websites will be deployed via [GitHub Actions](https://github.com/features/actions)


## Getting Started

There are several setup steps you must undertake before you can deploy your website

### Set up a GPG key

:::note
Developers as of 5th October 2023 have already completed this step
:::

You first need to make sure you have your own GPG Key set up and added to our [private GPG keys repository](https://github.com/wesayhowhigh/jump-gpg-keys)


To generate a key, type the following into your terminal and follow the steps (using your JUMP work email address):

```shell
gpg --gen-key
```

You will then need to export your public key: (it's important your key has a name that matches your email address)

```shell
gpg --armor --export yourname@wesayhowhigh.com > yourname@wesayhowhigh.com.gpg
```

You then need to:
1. Clone the [private GPG keys repository](https://github.com/wesayhowhigh/jump-gpg-keys)
2. Copy your exported key `yourname@wesayhowhigh.com.gpg` to the `/keys/` folder inside the repository
3. Create a new branch, commit your key, push your branch and create a Pull Request.
4. Once the PR is approved and merged, you may proceed

### Install Git Secret

Install `git-secret` by running the following in your terminal:

```shell
brew install git-secret
```


### Set up helper scripts

Inside the [private GPG keys repository](https://github.com/wesayhowhigh/jump-gpg-keys) there are 2 scripts inside the `/scripts/` folder

Copy them to your `/usr/local/bin` folder and make them executable
```shell
# Copy 2 scripts into /usr/local/bin
cp ./scripts/init-env.sh /usr/local/bin
cp ./scripts/init-git-secret-script.sh /usr/local/bin

# Make executable
chmod +x /usr/local/bin/init-env.sh
chmod +x /usr/local/bin/init-git-secret-script.sh
```

### Set up your website repository

#### Your repository secrets and variables

Your repository will need to have the relevant secrets and variables adding for when you make the necessary additions to the code base.

Go to your repository in GitHub and go to **Settings** > **Environments** and create each environment you are looking to add.

For each one, add an environment secret named `ORIGIN_IP` (the IP you will be deploying to) and an environment variable named `SITE_NAME` (usually your site name in kebab case).

:::caution

If you are deploying a site that is using October v3 or above, make sure you add a repository secret named `OCTOBER_LICENCE_KEY` which will contain the licence key you get when you create a new October CMS project. You can do this by going to **Settings** > **Secrets and variables** > **Actions** and adding it under **Repository secrets** in the GitHub repository.

:::

:::caution

In some cases you may need to add additional secrets and variables depending on the makeup of the site. For any out of the ordinary sites, it’s always best to check if any others will be needed.

:::

#### Your GitHub Actions workflow

To deploy a website, you need a GitHub Action Workflow file and it will need to be placed inside the `.github/workflows/` directory (creating it if not present).
On the next merge to main/master/develop (depending on the October version and environment) GitHub will detect this file and run it automatically.

You can find the Workflow templates available at:

https://github.com/wesayhowhigh/lightsail-github-action-workflows


You will see a folder for each version of October CMS the website is built in (1.0, 1.1 and 3.x).

Inside each folder will be a `production` and `uat` file. If you need more environments, please let the lead developer know and you can go through it together.
Simply copy whichever file you need into your project.


## Managing the .env file

The `.env` files for **production**, **uat** or any other environments you create are securely encrypted inside the repository. Each member of the team has rights to encrypt/decrypt alongside the GitHub Action runner.

### Adding an Environment

If you've followed all the steps above, you simply need to run the following command in the terminal in the root of the project:

```shell
init-env.sh THE_ENVIRONMENT_NAME_YOU_WANT_TO_CREATE

# For example:
init-env.sh production
init-env.sh uat
```

You should see a new file `.env.THE_ENVIRONMENT_NAME_YOU_WANT_TO_CREATE`. (i.e. `.env.production`)

This is the production ENV file and you can update it with the production details in the same way you do with your local .env file.

:::danger
**Never** commit the raw .env. files to GitHub 
(it should be hard to do - they should be added to your .gitignore file automatically - but just in case)

Only the `.env.environment.secret` files should be committed
:::

Once you've filled in the .env file and you're ready to deploy, run the following command to encrypt the file:

```shell
git secret hide -d
```

This will create the `.env.environment.secret` file and delete the `.env.environment` file to prevent accidental upload or future conflicts.

Then simply commit, create a PR and on merge your env will be used in the deployment.

### Modifying an Environment

If you are working on a project that already has an environment set up (determined by the presence of a workflow file inside `.github/workflows/` and an `.env.environment.secret` file) and you need to modify a value:

Run the following to decrypt it:
```shell
git secret reveal
```

This will decrypt all the relevant env files in the project - you should see `.env.environment` files, ready to be edited.

:::danger
**Never** commit the raw .env. files to GitHub
(it should be hard to do - they should be added to your .gitignore file automatically - but just in case)

Only the `.env.environment.secret` files should be committed
:::

Once you've filled in the .env file, and you're ready to deploy, run the following command to re-encrypt the file:

```shell
git secret hide -d
```

Then simply commit, create a PR and on merge your env will be used in the deployment.
:::danger
**It is imperative we avoid git conflicts with the encrypted .env files - they would be impossible to resolve by hand.**

Therefore changes to .env files should be committed as soon as possible and if more than 1 developer is working on a project they should collaborate closely when the environment files are being modified.
:::