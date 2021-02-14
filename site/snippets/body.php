<?php foreach ($field->toLayouts() as $layout): ?>
    <article id="<?= $layout->id() ?>" class="row">
        <?php foreach ($layout->columns() as $column): ?>
            <?php
            $isEmpty = $column->blocks()->isEmpty();
            $transparent = mt_rand(0, 1) == 1; // true or false

            $columnWidth = 'column-' . str_replace('/', '-', $column->width());
            $backgroundColor = $isEmpty && $transparent ? 'bg-transparent' : 'bg-paper';
            
            $sectionClassList = 'block column ' . $columnWidth . ' ' . $backgroundColor;
            ?>
            <section class="<?= $sectionClassList ?>" style="--columns: <?= $column->span() ?>">
                <?php if ($isEmpty): ?>
                    <div class="spacing bg-<?php e($transparent, 'transparent', 'highlight') ?>"></div>
                <?php else: ?>
                    <?php foreach($column->blocks() as $block): ?>
                        <?php snippet('blocks/' . $block->type(), [
                            'block' => $block,
                            'columnWidth' => $column->width(),
                        ]) ?>
                    <?php endforeach; ?>
                <?php endif; ?>
            </section>
        <?php endforeach ?>
    </article>
<?php endforeach ?>
