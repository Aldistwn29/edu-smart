<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use App\Models\Material;
use App\Models\MateriProgres;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MateriController extends Controller
{
    public function index(Request $request)
    {
        $query = Material::with(['teacher', 'classroom'])->where('status', 'published');

        if ($request->filled('search')) {
            $query->where('title', 'like', '%'.$request->search.'%');
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

    public function show(Material $material)
    {
        $material->load(['teacher', 'classroom']);

        $nextMateri = Material::where('class_id', $material->class_id)
            ->where('status', 'published')
            ->where('order', '>', $material->order)
            ->orderBy('order', 'asc')
            ->first();

        $isCompleted = MateriProgres::where('student_id', Auth::id())
            ->where('material_id', $material->id)
            ->exists();

        return Inertia::render('Siswa/Materi/Show', [
            'material' => $material,
            'nextMaterial' => $nextMateri,
            'isCompleted' => $isCompleted,
        ]);
    }

    public function completed(Material $material)
    {
        MateriProgres::firstOrCreate([
            'student_id' => Auth::id(),
            'material_id' => $material->id,
        ], [
            'is_completed' => true,
        ]);

        return back()->with('success', 'Materi berhasil ditandai selesai');
    }
}
