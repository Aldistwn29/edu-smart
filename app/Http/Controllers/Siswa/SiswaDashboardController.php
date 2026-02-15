<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class SiswaDashboardController extends Controller
{
    public function dashboard()
    {
        return Inertia::render('Siswa/Dashboard');
    }
}
