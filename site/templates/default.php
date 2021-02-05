<?php snippet('header') ?>

<main>
    <canvas id="generative_pattern"></canvas>
    <h1 class="block block-xl"><?= $page->title()->html() ?></h1>
    <?php snippet('layouts', ['field' => $page->layout()])  ?>
</main>

<?php snippet('footer') ?>