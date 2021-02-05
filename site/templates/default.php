<?php snippet('header') ?>

<main>
    <canvas id="generative_pattern"></canvas>
    <article class="row">
        <section class="column column-1-1">
            <h1><?= $page->title()->html() ?></h1>
        </section>
    </article>
    <?php snippet('layouts', ['field' => $page->layout()])  ?>
</main>

<?php snippet('footer') ?>