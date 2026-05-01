<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class SecurityHeaders
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $response = $next($request);

        // Skip security headers in development to avoid CSP issues with Vite
        if (config('app.debug')) {
            return $response;
        }

        // Production only: Apply security headers
        // Prevent MIME type sniffing
        $response->headers->set('X-Content-Type-Options', 'nosniff');

        // Prevent clickjacking
        $response->headers->set('X-Frame-Options', 'SAMEORIGIN');

        // Enable XSS protection
        $response->headers->set('X-XSS-Protection', '1; mode=block');

        // Control referrer information
        $response->headers->set('Referrer-Policy', 'strict-origin-when-cross-origin');

        // Content Security Policy for production
        $csp = $this->getContentSecurityPolicy();
        $response->headers->set('Content-Security-Policy', $csp);

        return $response;
    }

    /**
     * Get Content Security Policy based on environment.
     * Only used in production (APP_DEBUG=false).
     */
    protected function getContentSecurityPolicy(): string
    {
        // Production CSP - Stricter policy
        $scriptSources = "'self' 'unsafe-inline'";
        $styleSources = "'self' 'unsafe-inline' https://fonts.bunny.net https://fonts.googleapis.com";

        return "default-src 'self'; ".
            "script-src {$scriptSources}; ".
            "script-src-elem {$scriptSources}; ".
            "style-src {$styleSources}; ".
            "style-src-elem {$styleSources}; ".
            "img-src 'self' data: https: blob:; ".
            "font-src 'self' data: https://fonts.bunny.net https://fonts.gstatic.com; ".
            "connect-src 'self' https://generativelanguage.googleapis.com; ".
            "frame-src 'self';";
    }
}
