<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php e($page->isUnlisted() && !$page->isHomePage(), '<meta name="robots" content="noindex">'); ?>
    <title><?php e($page->isHomePage(), $page->title()->html(), $titleTag) ?></title>
    <link rel="shortcut icon" href="<?= asset('assets/img/favicon.ico')->url() ?>" type="image/icon type">
    <!-- Load CSS inline because it is super tiny -->
    <style><?= require 'assets/css/site.css' ?></style>
</head>
<body>
    <header>
        <section id="logo">
            <a class="block block-xl" href="<?= $site->url() ?>">
                <img src="<?= asset('assets/img/klanglabor_logo.svg')->url() ?>" alt="<?= $site->title()->html() ?>">
                <span class="sr-only">Zur Startseite</span>
            </a>
        </section>

        <?php snippet('search') ?>

        <?php snippet('navigation') ?>

        <?php snippet('breadcrumb')  ?>
    </header>