<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="<?= $site->description() ?>">
    <meta name="keywords" content="<?= $site->keywords() ?>">
    <title><?= $page->title()->html() ?> | <?= $site->title()->html() ?></title>
    <!-- Global CSS -->
    <?= css('assets/css/site.css') ?>
</head>
<body>
    <header>
        <section>
            <a class="block block-xl" href="<?= $site->url() ?>">
                <img id="logo" src="<?= asset('assets/img/klanglabor_logo.svg')->url() ?>" alt="<?= $site->title()->html() ?>">
            </a>
        </section>

        <section>
            <p class="block block-xl">Suchbegriff eingeben...</p>
        </section>

        <button aria-expanded="false" aria-label="Main Navigation Toggle" id="mainNavToggle" class="block block-xl">
            Menü
            <!--
            <span class="sr-only">öffnen</span>
            <span class="sr-only hidden">schließen</span>
            -->
        </button>

        <nav aria-label="Main Navigation List" role="navigation" id="mainNav">
            <?= $navHTML ?>
        </nav>
    </header>