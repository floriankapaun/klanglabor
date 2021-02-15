<?php snippet('header') ?>

<main>
    <article class="row">
        <section class="column column-1-1 bg-paper block ">
            <a class="anchor-link" href="#<?= $page->title()->html() ?>">
                <h1 id="<?= $page->title()->html() ?>"><?= $page->title()->html() ?></h1>
            </a>
        </section>
    </article>
    <?php snippet('body', ['field' => $page->layout()])  ?>
    <?php snippet('cookieConsent') ?>
</main>

<?php snippet('footer') ?>