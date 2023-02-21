<div align='center'>
<a href="https://jenkins.pierreccesario.com/job/PCPartsTool/">
    <img src="https://jenkins.pierreccesario.com/buildStatus/icon?job=PCPartsTool&style=flat-square">
</a>
<p>
  <a href="https://github.com/PScoriae/PCPartsTool/blob/main/LICENSE.md">
    <img src="https://img.shields.io/github/license/othneildrew/Best-README-Template.svg?style=for-the-badge">
  </a>
  <a href="https://linkedin.com/in/pierreccesario">
    <img src="https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555">
  </a>
</p>
<p>
  <img src="./static/favicon.svg" width=300>
</p>

## PCPartsTool

</div>
<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about">About</a>
      <ol>
        <li><a href="#features">Features</a></li>
        <li><a href="#cloud-architecture">Cloud Architecture</a></li>
      </ol>
    </li>
    <li><a href="#installation">Installation</a></li>
    <li>
      <a href="#developing">Developing</a>
    </li>
    <li>
      <a href="#testing">Testing</a>
    </li>
    <li>
      <a href="#building">Building</a>
    </li>
    <li>
      <a href="#deployment">Deployment</a>
      <ol>
        <li><a href="#cloud-deployment">Cloud Deployment</a></li>
        <li><a href="#local-deployment">Local Deployment</a></li>
      </ol>
    </li>
  </ol>
</details>
<hr/>

# About

**Note: This project has been taken offline as it was only live for demonstration purposes.**

This project is a SvelteKit MongoDB WebApp that aggregates the latest popular PC parts and prices from popular Malaysian E-Commerce sites for users to configure and create their own PC parts lists. If you've heard of [PCPartPicker](https://pcpartpicker.com), it's very similar to that though on a hobby scale.

**Note:** This is just one of multiple repositories that contribute to the PCPartsTool project. Here are all the related repositories:

| Repository                                                             | Built With                                                                                                                                                                                                                                                               | Description                                                         |
| ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------- |
| [PCPartsTool](https://github.com/PScoriae/PCPartsTool)                 | [SvelteKit](https://kit.svelte.com), [TypeScript](https://www.typescriptlang.org/), [Tailwind CSS](https://tailwindcss.com), [MongoDB](https://mongodb.com), [Jenkins](https://www.jenkins.io/), [Docker](https://www.docker.com/), [Playwright](https://playwright.dev) | The SvelteKit MongoDB WebApp                                        |
| [PCPartsTool-Scraper](https://github.com/PScoriae/PCPartsTool-Scraper) | [JavaScript](https://www.javascript.com/), [Jenkins](https://www.jenkins.io/), [Docker](https://www.docker.com/)                                                                                                                                                         | Scraping Script to Gather E-commerce Item Data                      |
| [terraform-infra](https://github.com/PScoriae/terraform-infra)         | [Terraform](https://terraform.com), [Cloudflare](https://cloudflare.com), [AWS](https://aws.amazon.com)                                                                                                                                                                  | Terraform IaC for PCPartsTool Cloud Infrastructure                  |
| [ansible-ec2](https://github.com/PScoriae/ansible-ec2)                 | [Ansible](https://ansible.com), [Prometheus](https://prometheus.io), [Grafana](https://grafana.com), [Nginx](https://nginx.com), [AWS](https://aws.amazon.com)                                                                                                           | Ansible CaC for AWS EC2 Bootstraping, Observability and Maintenance |

## Features

- Authentication
- Savings Parts Lists to Account
- Sharing Parts Lists through Unique URLs
- Learning Centre for PC Parts

## Cloud Architecture

<img src="docs/cloud-arch.webp">

# Installation

## Prerequisites

There are some prerequisites before you can start working on this project:

1. [Docker](https://docs.docker.com/get-docker/)
2. [Node and npm](https://nodejs.org/en/download/)

Consult their official websites for advice on how to install them on your system.

## Installation

This installation guide walks you through how to completely mimic my setup for development and deployment.

1. Fork this repo.
2. In your desired project folder, run the following command in your terminal:

   ```bash
   git clone https://github.com/yourUsername/PCPartsTool
   ```

3. Add a `.env` file to the root directory of your project. You may refer to `.env.example`. It's for the app to point to the desired database.
4. Ensure `pnpm` is installed globally on your dev system. If not, run the following command in your terminal:

   ```bash
   npm i -g pnpm
   ```

5. Finally, install all dependencies:
   ```bash
   pnpm i
   ```

# Developing

Before you can develop, you'll need to get a Dockerized MongoDB instance running. Run the following command in your terminal:

```bash
sudo docker run -p 4600:27017 -v /your/database/path/here/:/data/db --name mongodb -d mongo
```

where the -v flag specifies the path of your MongoDB on your host system. Place the backup files here if you have one.

If you need data for MongoDB, use [PCPartsTool-Scraper](https://github.com/PScoriae/PCPartsTool-Scraper) - refer to its README.

To start a development server:

```bash
pnpm dev
```

# Testing

PCPartsTools uses [Playwright](https://playwright.dev) as its E2E testing framework.

Tests are configured to run on port `4173`, the port that `pnpm preview` uses.

To run tests:

```bash
pnpm test # you will need to have a preview server running

# run tests without having to start up a preview server
pnpm test:ci

# show test results
pnpm test-report
```

# Building

To compile the app, run the following:

```bash
pnpm build

# you can preview the production build
pnpm preview
```

To create a Docker container, you may use the included Dockerfile:

```bash
sudo docker build -t PCPartsTool .
```

# Deployment

## Cloud Deployment

This section talks about deploying the Dockerised app to a domain using Jenkins CI/CD and Ansible.

Since my infrastructure has two servers (a build server and a web server), the included Jenkinsfile, Docker Compose files and Ansible Playbooks are catered towards that. As such, these instructions are catered towards my infrastructure.

If other repositories are mentioned, refer to their READMEs on how to set up and use them.

1. Provision AWS and Cloudflare resources using [terraform-infra](https://github.com/PScoriae/terraform-infra)'s `.tf` files.
2. Configure AWS EC2 servers using [ansible-ec2](https://github.com/PScoriae/ansible-ec2)'s Playbooks.
3. Modify `ansible/inventory`'s target web server to the IP address of your own web server.
4. Setup a GitHub Webhook on your forked repository to point to your Jenkins instance.
5. Add a new Jenkins Pipeline job and point it to your forked repo with the following enabled:
   - Do not allow concurrent builds
   - GITScm polling
   - Pipeline Script from SCM
   - Repository URL should be whatever your forked repository's URL is
   - Branches to build: `*/main`
   - Additional Behaviours:
     - Polling ignores commits in certain paths: `README.md` in **Excluded regions**

If all was configured well, a new Docker Compose build should automatically be deployed from your CICD build server to your Web server after each push or merge to the `main` branch.

## Local Deployment

This section details how to locally deploy the Docker Compose on your own dev machine.

1. First, you will need to Dockerize and create and image for the [PCPartsTool-Scraper](https://github.com/PScoriae/PCPartsTool-Scraper). Refer to its README for instructions.
2. Ensure the PCPartsTool-Scraper image is locally stored in your Docker Engine - you can verify with the `docker images` command.
3. Run the build command to compile the source code, as detailed in the [Building](#building) section.
4. Run the following command in the root directory of this project:
   ```bash
   docker compose -f docker-compose.local.yml up -d --build
   ```
   What this command does is instruct `docker compose` to use the `docker-compose.local.yml` file and simultaneously build the PCPartsTool app before composing and starting the MongoDB container, PCPartsTool-Scraper and PCPartsTool web app itself.
