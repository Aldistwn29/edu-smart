<?php

declare(strict_types=1);

return [

    /*
    |--------------------------------------------------------------------------
    | Google Gemini API Key
    |--------------------------------------------------------------------------
    |
    | API key dari Google AI Studio (https://aistudio.google.com/app/apikey).
    */
    'api_key' => env('GEMINI_API_KEY'),

    /*
    |--------------------------------------------------------------------------
    | Gemini Proxy URL (Cloudflare Workers)
    |--------------------------------------------------------------------------
    |
    | Base URL Cloudflare Worker sebagai reverse proxy ke Google API.
    | Wajib diisi untuk VPS region Indonesia.
    |
    | Jika kosong, request langsung ke:
    | https://generativelanguage.googleapis.com
    */
    'proxy_url' => env('GEMINI_PROXY_URL'),

    /*
    |--------------------------------------------------------------------------
    | Gemini Model
    |--------------------------------------------------------------------------
    |
    | Model yang digunakan. Untuk Google langsung, tanpa prefix "google/".
    | Contoh: gemini-2.5-flash, gemini-2.0-flash
    */
    'model' => env('GEMINI_MODEL', 'gemini-2.5-flash'),

    /*
    |--------------------------------------------------------------------------
    | Request Timeout
    |--------------------------------------------------------------------------
    |
    | Maksimum detik menunggu response dari API.
    */
    'request_timeout' => env('GEMINI_REQUEST_TIMEOUT', 30),

    /*
    |--------------------------------------------------------------------------
    | Request Proxy (opsional)
    |--------------------------------------------------------------------------
    |
    | HTTP/SOCKS proxy jika diperlukan.
    | Format: http://proxy-server:port atau socks5://proxy-server:port
    */
    'proxy' => env('GEMINI_PROXY'),

];
