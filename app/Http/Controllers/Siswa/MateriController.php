<?php

namespace App\Http\Controllers\Siswa;

use App\Models\Material;
use App\Models\MateriProgres;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class MateriController
{
    public function index(Request $request): Response
    {
        $classIds = Auth::user()->enrolledClasses()->pluck('class_rooms.id');

        $query = Material::query()->with(['teacher', 'classroom'])
            ->where(function ($q) use ($classIds) {
                $q->whereIn('class_id', $classIds)->orWhereNull('class_id');
            })
            ->where('status', 'published');

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->whereHas('classroom', function ($q2) use ($request) {
                    $q2->where('subject', 'like', '%'.$request->search.'%');
                })->orWhere('title', 'like', '%'.$request->search.'%');
            });
        }

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        $materials = $query->latest()->paginate(10)->withQueryString();

        return Inertia::render('Siswa/Materi/Index', [
            'materials' => $materials,
            'filters' => $request->only(['search', 'type']),
        ]);
    }

    public function show(Material $material): Response
    {
        if ($material->class_id && ! Auth::user()->enrolledClasses()->where('class_rooms.id', $material->class_id)->exists()) {
            abort(403);
        }

        $material->load(['teacher', 'classroom']);

        $nextMateri = Material::query()->where('class_id', $material->class_id)
            ->where('status', 'published')
            ->where('order', '>', $material->order)
            ->orderBy('order', 'asc')
            ->first();

        $isCompleted = MateriProgres::query()->where('student_id', Auth::id())
            ->where('material_id', $material->id)
            ->exists();

        return Inertia::render('Siswa/Materi/Show', [
            'material' => $material,
            'nextMaterial' => $nextMateri,
            'isCompleted' => $isCompleted,
        ]);
    }

    public function completed(Material $material): RedirectResponse
    {
        MateriProgres::query()->firstOrCreate([
            'student_id' => Auth::id(),
            'material_id' => $material->id,
        ], [
            'is_completed' => true,
        ]);

        return back()->with('success', 'Materi berhasil ditandai selesai');
    }
}
