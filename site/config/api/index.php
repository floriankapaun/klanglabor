<?php

return [
    'basicAuth' => true,
    'slug' => $env['API_SLUG'],
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
                },
                'method' => 'POST'
            ],
        ];
    },
];
