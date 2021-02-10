<?php
/**
 * Category pages contain subpages but no content. Therefore
 * they shouldn't be accessible.
 * 
 * If users requests a category page, forward them to the parent
 * url. If there is no parent, forward them to the root url.
 */
if ($page->parent()) {
    go($page->parent()->url(), 302);
} else {
    go($site->url());
}