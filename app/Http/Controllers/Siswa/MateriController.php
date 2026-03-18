<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use App\Models\Material;
use Illuminate\Http\Request;
use Inertia\Inertia;

class MateriController extends Controller
{
    public function index(Request $request)
    {
        $query = Material::with(['teacher', 'classroom']);

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
            ->where('order', '>', $material->order)
            ->orderBy('order', 'asc')
            ->first();

        return Inertia::render('Siswa/Materi/Show', [
            'material' => $material,
            'nextMaterial' => $nextMateri,
        ]);
    }
}
