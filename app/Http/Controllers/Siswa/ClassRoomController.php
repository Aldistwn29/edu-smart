<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;

class ClassRoomController extends Controller
{
    public function index()
    {
        $classrooms = Auth::user()
            ->enrolledClasses()
            ->with('teacher')
            ->withCount('students')
            ->latest()
            ->get();

        return Inertia('Siswa/ClassRoom/Index', [
            'classrooms' => $classrooms,
        ]);
    }
}
