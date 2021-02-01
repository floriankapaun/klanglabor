<?php foreach ($field->toLayouts() as $layout): ?>
    <?php foreach ($layout->columns() as $column): ?>
        <?= $column->blocks() ?>
    <?php endforeach ?>
<?php endforeach ?>
