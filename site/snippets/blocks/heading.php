<a class="anchor-link" href="#<?= $block->text() ?>">
    <<?= $level = $block->level()->or('h2') ?> id="<?= $block->text() ?>">
        <?= $block->text() ?>
    </<?= $level ?>>
</a>