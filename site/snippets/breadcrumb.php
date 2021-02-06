<nav aria-label="breadcrumb">
    <ul id="breadcrumb">
        <!-- Skip home and current page in breadcrumbs -->
        <?php foreach($site->breadcrumb() as $crumb): ?>
            <?php if ($crumb->id() == 'home' || $crumb->id() == $page->id()):
                continue;
            endif; ?>
            <li class="caps block block-xl">
                \ <?= html($crumb->title()) ?>
            </li>
        <?php endforeach ?>
    </ul>
</nav>