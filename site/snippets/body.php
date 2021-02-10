<?php foreach ($field->toLayouts() as $layout): ?>
    <article id="<?= $layout->id() ?>" class="row">
        <?php foreach ($layout->columns() as $column): ?>
            <?php
            $isEmpty = $column->blocks()->isEmpty();
            $transparent = mt_rand(0, 1) == 1; // true or false

            $columnWidth = 'column-' . str_replace('/', '-', $column->width());
            $backgroundColor = $isEmpty && $transparent ? 'bg-transparent' : 'bg-paper';
            
            $sectionClassList = 'column ' . $columnWidth . ' ' . $backgroundColor;
            ?>
            <section class="<?= $sectionClassList ?>" style="--columns: <?= $column->span() ?>">
                <?php e(
                    $isEmpty,
                    '<div class="spacing bg-' . ($transparent ? 'transparent' : 'highlight') . '"></div>',
                    $column->blocks()
                ); ?>
            </section>
        <?php endforeach ?>
    </article>
<?php endforeach ?>
