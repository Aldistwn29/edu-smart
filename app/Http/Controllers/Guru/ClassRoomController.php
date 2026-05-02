<?php

namespace App\Http\Controllers\Guru;

use App\Models\ClassRoom;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Inertia\Inertia;
use Inertia\Response;

class ClassRoomController
{
    public function index(): Response
    {
        $classrooms = Auth::user()->teachingClasses()
            ->withCount('students')
            ->latest()
            ->get();

        return Inertia::render('Guru/ClassRoom/Index', [
            'classrooms' => $classrooms,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Gate::authorize('create', ClassRoom::class);

        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'subject' => 'required|string|max:255',
            'academic_year' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        // generate code
        Auth::user()->teachingClasses()->create($validated);

        return back()->with('success', 'Kelas berhasil dibuat');
    }

    public function show(ClassRoom $classRoom): Response
    {
        Gate::authorize('view', $classRoom);

        // Load classroom with student counts
        $classRoom->loadCount(['students', 'materials', 'quizzes'])->load([
            'students' => function ($query) {
                $query->select('users.id', 'users.name', 'users.email')->orderBy('name', 'asc');
            },
        ]);

        // Fetch materials with human-friendly dates
        $materials = $classRoom->materials()
            ->latest()
            ->get()
            ->map(function ($material) {
                $material->created_at_human = $material->created_at->diffForHumans();

                return $material;
            });

        // Fetch quizzes with question counts
        $quizzes = $classRoom->quizzes()
            ->withCount('questions')
            ->latest()
            ->get();

        return Inertia::render('Guru/ClassRoom/Show', [
            'classroom' => $classRoom,
            'materials' => $materials,
            'quizzes' => $quizzes,
        ]);
    }

    public function destroy(ClassRoom $classRoom): RedirectResponse
    {
        Gate::authorize('delete', $classRoom);

        $classRoom->delete();

        return redirect()->route('guru.classroom.index')
            ->with('success', "Kelas {$classRoom->name} berhasil dihapus");
    }
}
