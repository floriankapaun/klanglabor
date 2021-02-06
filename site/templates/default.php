<?php snippet('header') ?>

<main>
    <canvas id="generative_pattern"></canvas>
    <article class="row">
        <section class="column column-1-1 bg-paper">
            <a class="anchor-link" href="#<?= $page->title()->html() ?>">
                <h1 id="<?= $page->title()->html() ?>"><?= $page->title()->html() ?></h1>
            </a>
        </section>
    </article>
    <?php snippet('body', ['field' => $page->layout()])  ?>
</main>

<?php snippet('footer') ?>