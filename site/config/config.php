<?php

return [
    'thumbs' => [
        'presets' => [
            'default' => [
                'width' => 150,
                'height' => 150,
                'quality' => 70
            ],
            'blurred' => [
                'blur' => true
            ],
        ],
    ],
    'routes' => [
        [
          'pattern' => 'sitemap.xml',
          'action'  => function() {
              $pages = site()->pages()->index();
              // Fetch the pages to ignore from the config settings,
              // if nothing is set, we ignore the error page.
              $ignore = kirby()->option('sitemap.ignore', ['error']);
              $content = snippet('sitemap', compact('pages', 'ignore'), true);
              // Return response with correct header type.
              return new Kirby\Cms\Response($content, 'application/xml');
          }
        ],
    ],
];