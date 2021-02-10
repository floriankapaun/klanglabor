# Klanglabor Webseite

## About

[Kirby](https://getkirby.com) based website of the [Klanglabor](https://klanglabor.hs-augsburg.de). 

## Architecture

This project is built on top of Kirby's folder structure.

### [`/assets`](./assets)

Contains CSS, JavaScript and images such as the logo.

### [`/content`](./content)

This folder contains the content of the website. Kirby is a file-based CMS, which means that it does not use a database, but stores all content in local files.

In production, there are many more files in this folder, but only the essential ones are stored in the repository.

### [`/site`](./site)

This is the most important folder from the developer's point of view. It contains the templates, snippets, configuration, controllers and blueprints for the panel (=backend).

### [`/kirby`](./kirby)

Kirby CMS' core – untouched.

### [`/media`](./media)

This folder is empty. Kirby stores uploaded images, thumbnails and such in the "media" folder automatically.

## Setup

To run a local server hosting this website, clone this repository, open your terminal in the repositories folder, and run:

    php -S localhost:8000 kirby/router.php

## Quick Links

- [Get started with Kirby](https://getkirby.com/docs/guide/quickstart).
- [License agreement](https://getkirby.com/license)
