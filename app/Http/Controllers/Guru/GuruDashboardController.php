<?php

namespace App\Http\Controllers\Guru;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class GuruDashboardController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Guru/Dashboard');
    }
}
