<?php

return [
    'api' => [
        'slug' => 'api/v1',
        'routes' => function ($kirby) {
            return [
                [
                    'pattern' => 'search',
                    'action'  => function () use ($kirby) {
                        // Get query from URL (?q=...)
                        $query   = get('q');
                        // Search by query
                        $results = $kirby->site()->search($query, [
                            'words' => false, 
                            'score' => ['id' => 64,'title' => 64],
                        ])->paginate(10);
                        // Add page titles to results
                        foreach ($results as $key => $value) {
                            $results->{$key}->title = $value->title();
                        }
                        // Return search results
                        return [
                            'query'   => $query,
                            'results' => $results,
                        ];
                    }
                ]
            ];
        },
    ],
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