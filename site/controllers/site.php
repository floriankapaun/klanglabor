<?php
function getRandom($min = 0, $max = 1, $mul = 1) {
    if ($max < $min) {
        return mt_rand($max * $mul, $min * $mul) / $mul;
    } else {
        return mt_rand($min * $mul, $max * $mul) / $mul;
    }
}

function getLinkHTML($item, $hasPopup) {
    return '<a ' . ($item->isOpen() ? 'aria-current' : null) . ($hasPopup ? 'aria-expanded="false"' : null) . ' href="' . $item->url() . '" class=" block block-xl nav-link">' . $item->title()->html() . '</a>';
}

function getNavHTML($item) {
    $nav = '<ul class="nav-section">';
    foreach($item->children->listed() as $child) {
        $hasPopup = sizeof($child->children()->listed()) > 0;
        $nav .= '<li class="nav-item">' . getLinkHTML($child, $hasPopup);
        if ($hasPopup) {
            $res = getNavHTML($child);
            $nav .= $res;
        }
        $nav .= '</li>';
    }
    $nav .= '</ul>';
    return $nav;
}

return function ($site, $page) {
    # Fetch and store the content for the title tag and the meta description
    $titleTag        = $page->title() . ' \ ' . $site->title();
    $metaDescription = $page->text()->excerpt(120);
    
    $navHTML = getNavHTML($site);

    $minNumberOfLines = $site->minNumberOfLines()->toFloat();
    $maxNumberOfLines = $site->maxNumberOfLines()->toFloat();
    $minNumberOfPoints = $site->minNumberOfPoints()->toFloat();
    $maxNumberOfPoints = $site->maxNumberOfPoints()->toFloat();
    $minNumberOfSegments = $site->minNumberOfSegments()->toFloat();
    $maxNumberOfSegments = $site->maxNumberOfSegments()->toFloat();
    $minSineWidth = $site->minSineWidth()->toFloat();
    $maxSineWidth = $site->maxSineWidth()->toFloat();
    $minSineHeight = $site->minSineHeight()->toFloat();
    $maxSineHeight = $site->maxSineHeight()->toFloat();
    $minTension = $site->minTension()->toFloat();
    $maxTension = $site->maxTension()->toFloat();
    $minDistortionInterval = $site->minDistortionInterval()->toFloat();
    $maxDistortionInterval = $site->maxDistortionInterval()->toFloat();
    $minLineWidth = $site->minLineWidth()->toFloat();
    $maxLineWidth = $site->maxLineWidth()->toFloat();

    return [
        'titleTag' => $titleTag,
        'metaDescription' => $metaDescription,
        'navHTML' => $navHTML,
        'numberOfLines' => getRandom($minNumberOfLines, $maxNumberOfLines),
        'numberOfPoints' => getRandom($minNumberOfPoints, $maxNumberOfPoints),
        'numberOfSegments' => getRandom($minNumberOfSegments, $maxNumberOfSegments),
        'sineWidth' => getRandom($minSineWidth, $maxSineWidth, 1000),
        'sineHeight' => getRandom($minSineHeight, $maxSineHeight, 1000),
        'tension' => getRandom($minTension, $maxTension, 1000),
        'distortionInterval' => getRandom($minDistortionInterval, $maxDistortionInterval),
        'lineWidth' => getRandom($minLineWidth, $maxLineWidth)
    ];
};