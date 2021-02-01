<?php foreach ($field->toLayouts() as $layout): ?>
    <section id="<?= $layout->id() ?>" class="row">
        <?php foreach ($layout->columns() as $column): ?>
            <div class="column column-<?= str_replace('/', '-', $column->width()) ?>" style="--columns: <?= $column->span() ?>">
                <?php e($column->blocks()->isEmpty(), '<div class="spacing"></div>', $column->blocks()) ?>
            </div>
        <?php endforeach ?>
    </section>
<?php endforeach ?>
