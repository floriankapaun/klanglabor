<?php

$alt = $block->alt();
$link = $block->link();
$webSrc = null;
$localSrc = null;
$srcset = null;

if ($block->location() == 'web') {
    $webSrc = $block->src();
}
if ($image = $block->image()->toFile()) {
    $alt = $alt ?? $image->alt();
    $localSrc = $image->url();
    $srcsetTemplate = $columnWidth == '1/1' ? 'default' : $columnWidth;
    $srcset = $image->srcset($srcsetTemplate);
}

?>

<?php if ($webSrc || $localSrc): ?>
<figure>
    <?php if ($link->isNotEmpty()): ?>
    <a href="<?= $link->toUrl() ?>">
    <?php endif ?>

        <img
            src="<?= $webSrc ?? $localSrc ?>" 
            alt="<?= $alt ?>"
            loading="lazy"
            <?php e($srcset, 'srcset="' . $srcset . '"') ?> />
            
    <?php if ($link->isNotEmpty()): ?>
    </a>
    <?php endif ?>
</figure>
<?php endif ?>
