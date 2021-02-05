<?php snippet('header') ?>

<main>
    <canvas id="generative_pattern"></canvas>
    <article class="row">
        <section class="column column-1-1 bg-paper">
            <h1><?= $page->title()->html() ?></h1>
        </section>
    </article>
    <?php snippet('body', ['field' => $page->layout()])  ?>
</main>

<?php snippet('footer') ?>