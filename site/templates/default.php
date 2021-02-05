<?php snippet('header') ?>

<main>
    <h1 class="block block-xl"><?= $page->title()->html() ?></h1>
    <?php snippet('layouts', ['field' => $page->layout()])  ?>
</main>

<?php snippet('footer') ?>