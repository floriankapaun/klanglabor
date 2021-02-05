<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <?php e($page->isUnlisted() && !$page->is('home'), '<meta name="robots" content="noindex">'); ?>
    <meta name="description" content="<?= $site->description() ?>">
    <meta name="keywords" content="<?= $site->keywords() ?>">
    <title><?= $page->title()->html() ?> | <?= $site->title()->html() ?></title>
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

        <button aria-expanded="false" aria-label="Main Navigation Toggle" id="mainNavToggle" class="block block-xl caps">
            Menü
            <!--
            <span class="sr-only">öffnen</span>
            <span class="sr-only hidden">schließen</span>
            -->
        </button>

        <nav aria-label="Main Navigation List" role="navigation" id="mainNav" class="caps">
            <?= $navHTML ?>
        </nav>
    </header>