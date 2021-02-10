<button aria-expanded="false" aria-label="Main Navigation Toggle" id="mainNavToggle" class="block block-xl caps">
    Menü
    <span class="sr-only">öffnen oder schließen</span>
</button>

<nav
    id="mainNav"
    class="caps"
    aria-label="Main Navigation List"
    role="navigation"
    style="--depth: <?= $navDepth ?>">
    <?= $navHTML ?>
</nav>