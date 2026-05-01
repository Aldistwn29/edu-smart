<?php

require __DIR__.'/vendor/autoload.php';
$app = require_once __DIR__.'/bootstrap/app.php';
$kernel = $app->make(Illuminate\Contracts\Console\Kernel::class);
$kernel->bootstrap();

use Gemini\Laravel\Facades\Gemini;

try {
    $models = Gemini::listModels()->models;
    foreach ($models as $model) {
        echo $model->name.PHP_EOL;
    }
} catch (\Exception $e) {
    echo 'Error: '.$e->getMessage().PHP_EOL;
}
