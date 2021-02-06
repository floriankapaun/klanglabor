<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php e($page->isUnlisted() && !$page->is('home'), '<meta name="robots" content="noindex">'); ?>
    <meta name="description" content="<?= $site->description() ?>">
    <meta name="keywords" content="<?= $site->keywords() ?>">
    <title><?= $page->title()->html() ?> | <?= $site->title()->html() ?></title>
    <link rel="shortcut icon" href="<?= asset('assets/img/favicon.ico')->url() ?>" type="image/icon type">
    <!-- Global CSS -->
    <?= css('assets/css/site.css') ?>
</head>
<body>
    <header>
        <section id="logo">
            <a class="block block-xl" href="<?= $site->url() ?>">
                <img src="<?= asset('assets/img/klanglabor_logo.svg')->url() ?>" alt="<?= $site->title()->html() ?>">
                <span class="sr-only">Zur Startseite</span>
            </a>
        </section>

        <section>
            <p class="block block-xl caps">Suchbegriff eingeben...</p>
        </section>

        <?php snippet('navigation') ?>

        <?php snippet('breadcrumb')  ?>
    </header>