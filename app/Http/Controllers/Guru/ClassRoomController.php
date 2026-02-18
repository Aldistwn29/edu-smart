<?php

namespace App\Http\Controllers\Guru;

use App\Http\Controllers\Controller;
use App\Models\ClassRoom;
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

    public function show(ClassRoom $classRoom)
    {
        // hanya guru yang bisa akses
        if ($classRoom->teacher_id != Auth::user()->id) {
            abort(403);
        }

        return Inertia::render('Guru/ClassRoom/Show', [
            'classroom' => $classRoom->load(['students']),
            'materials' => $classRoom->materials()->latest()->get(),
            'quizzes' => $classRoom->quizzes()->latest()->get(),
        ]);

    }
}
