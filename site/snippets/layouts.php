<?php foreach ($field->toLayouts() as $layout): ?>
    <article id="<?= $layout->id() ?>" class="row">
        <?php foreach ($layout->columns() as $column): ?>
            <section class="column column-<?= str_replace('/', '-', $column->width()) ?>" style="--columns: <?= $column->span() ?>">
                <?php e($column->blocks()->isEmpty(), '<div class="spacing"></div>', $column->blocks()) ?>
            </section>
        <?php endforeach ?>
    </article>
<?php endforeach ?>
