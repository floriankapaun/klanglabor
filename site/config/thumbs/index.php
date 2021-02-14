<?php

return [
    'presets' => [
        'default' => [
            'width' => 100,
            'quality' => 70,
            'blur' => 35,
        ],
    ],
    'srcsets' => [
        'default' => [
            '599w' => ['width' => 600, 'quality' => 80],
            '800w' => ['width' => 800, 'quality' => 80],
            '1140w' => ['width' => 1140, 'quality' => 80],
            '1440w' => ['width' => 1440, 'quality' => 80],
            '2048w' => ['width' => 2048, 'quality' => 80],
        ],
        '3/4' => [
            '599w' => ['width' => 600, 'quality' => 80],
            '800w' => ['width' => 800, 'quality' => 80],
            '1140w' => ['width' => 855, 'quality' => 80],
            '1440w' => ['width' => 1080, 'quality' => 80],
            '2048w' => ['width' => 1536, 'quality' => 80],
        ],
        '1/2' => [
            '599w' => ['width' => 600, 'quality' => 80],
            '800w' => ['width' => 800, 'quality' => 80],
            '1140w' => ['width' => 570, 'quality' => 80],
            '1440w' => ['width' => 720, 'quality' => 80],
            '2048w' => ['width' => 1024, 'quality' => 80],
        ],
        '1/4' => [
            '599w' => ['width' => 600, 'quality' => 80],
            '800w' => ['width' => 400, 'quality' => 80],
            '1140w' => ['width' => 285, 'quality' => 80],
            '1440w' => ['width' => 360, 'quality' => 80],
            '2048w' => ['width' => 512, 'quality' => 80],
        ],
    ],
];
