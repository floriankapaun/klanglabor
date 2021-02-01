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
    <!-- Template specific CSS -->
    <?= css('@auto') ?>
</head>
<body>
    <header>
        <div>
            <a id="logo" href="<?= $site->url() ?>">
                <?= $site->title()->html() ?>
            </a>
        </div>
        <nav>
            <?php foreach ($site->children()->listed() as $item): ?>
                <a <?php e($item->isOpen(), 'aria-current') ?> href="<?= $item->url() ?>">
                    <?= $item->title()->html() ?>
                </a>
            <?php endforeach ?>
        </nav>
    </header>