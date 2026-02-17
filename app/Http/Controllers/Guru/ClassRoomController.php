<?php

namespace App\Http\Controllers\Guru;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class ClassRoomController extends Controller
{
    public function index()
    {
        $classrooms = Auth::user()->teachingClasses()
            ->withCount('students')
            ->latest()
            ->get();

        return Inertia::render('Guru/ClassRoom/Index', [
            'classrooms' => $classrooms,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'subject' => 'required|string|max:255',
            'academic_year' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        // generate code
        Auth::user()->teachingClasses()->create($validated);

        return back()->with('succes', 'Kelas berhasil dibuat');
    }
}
