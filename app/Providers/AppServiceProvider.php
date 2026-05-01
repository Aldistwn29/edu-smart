<?php

namespace App\Providers;

use App\Models\Assigment;
use App\Models\ClassRoom;
use App\Models\Material;
use App\Models\Quize;
use App\Policies\AssignmentPolicy;
use Illuminate\Cache\RateLimiting\Limit;
use Illuminate\Database\Eloquent\Relations\Relation;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\RateLimiter;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        // Register policies
        Gate::policy(Assigment::class, AssignmentPolicy::class);

        // Configure rate limiters
        $this->configureRateLimiting();

        // morph map
        Relation::enforceMorphMap([
            'material' => Material::class,
            'quiz' => Quize::class,
            'classroom' => ClassRoom::class,
        ]);
    }

    /**
     * Configure the rate limiters for the application.
     */
    protected function configureRateLimiting(): void
    {
        // Rate limiter for file uploads
        RateLimiter::for('uploads', function (Request $request) {
            return $request->user()
                ? Limit::perMinute(5)->by($request->user()->id)
                : Limit::perMinute(2)->by($request->ip());
        });

        // Rate limiter for quiz submissions
        RateLimiter::for('quiz-submissions', function (Request $request) {
            return $request->user()
                ? Limit::perMinute(10)->by($request->user()->id)
                : Limit::perMinute(3)->by($request->ip());
        });

        // Rate limiter for login attempts
        RateLimiter::for('login', function (Request $request) {
            return Limit::perMinute(5)->by($request->ip());
        });
    }
}
