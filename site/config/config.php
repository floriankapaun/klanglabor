<?php

$env = [
    'API_SLUG' => 'api/v1',
    'API_USER' => 'rest@api.com',
    'API_PASSWORD' => 'password',
];

return [
    'api' => require_once 'api/index.php',
    'env' => $env,
    'routes' => require_once 'routes/index.php',
    'thumbs' => require_once 'thumbs/index.php',
];