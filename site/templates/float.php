<?php snippet('header') ?>

<main>
    <h1><?= $page->title()->html() ?></h1>
    <?php snippet('float-layouts', ['field' => $page->layout()])  ?>
</main>

<?php snippet('footer') ?>