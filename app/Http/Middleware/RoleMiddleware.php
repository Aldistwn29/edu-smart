<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class RoleMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next, string $role): Response
    {
        // cek apakah user sudah login dan punya akun role yang sesuai
        if (! $request->user() || $request->user()->role !== $role) {
            abort(403, 'Anda tidak mendapatkan akses ke halaman ini.');
        }

        return $next($request);
    }
}
