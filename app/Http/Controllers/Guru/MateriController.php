<?php

namespace App\Http\Controllers\Guru;

use App\Models\ActivityLog;
use App\Models\ClassRoom;
use App\Models\Material;
use App\Models\MateriProgres;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class MateriController
{
    public function index(Request $request): Response
    {
        $query = Material::query()->where('teacher_id', Auth::id())
            ->with(['classroom' => function ($q) {
                $q->withCount('students');
            }])
            ->withCount(['progress as completed_at_count' => function ($q) {
                $q->where('is_completed', true);
            }]);

        if ($request->has('type') && $request->type !== 'all') {
            $query->where('type', $request->type);
        }

        if ($request->filled('search')) {
            $query->where('title', 'like', '%'.$request->search.'%');
        }

        return Inertia::render('Guru/Materi/Index', [
            'materials' => $query->orderBy('order', 'asc')->get(),
            'filters' => [
                'type' => $request->type ?? 'all',
                'search' => $request->search ?? '',
            ],
        ]);
    }

    public function create(): Response
    {
        Gate::authorize('create', Material::class);

        return Inertia::render('Guru/Materi/Create', [
            'classrooms' => ClassRoom::query()->where('teacher_id', Auth::id())->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Gate::authorize('create', Material::class);

        $request->validate([
            'class_id' => 'required|exists:class_rooms,id',
            'title' => 'required|string|max:100',
            'description' => 'nullable|string',
            'type' => 'required|in:video,text,file',
            'content' => 'required_if:type,video|nullable|string',
            'file' => 'nullable|file|mimes:pdf,doc,docx,xls,xlsx,ppt,pptx|max:20480',
        ]);

        $material = new Material($request->only(['class_id', 'title', 'description', 'type']));
        $material->teacher_id = Auth::id();

        // Simpan konten (berlaku untuk video maupun text)
        if ($request->filled('content')) {
            $material->content = $request->content;
        }

        // Simpan lampiran file (berlaku untuk semua tipe)
        if ($request->hasFile('file')) {
            $material->file_path = $request->file('file')->store('materials', 'public');
        }

        $material->save();

        ActivityLog::query()->create([
            'user_id' => Auth::id(),
            'action_type' => 'create',
            'description' => 'Menambahkan materi baru: '.$material->title,
            'subject_name' => $material->classroom->name ?? 'N/A',
            'loggable_id' => $material->id,
            'loggable_type' => Material::class,
        ]);

        return redirect()->route('guru.materies.index')->with('success', 'Materi Berhasil diterbitkan!');
    }

    public function edit(Material $materi): Response
    {
        Gate::authorize('update', $materi);

        return Inertia::render('Guru/Materi/Edit', [
            'materi' => $materi,
            'classrooms' => ClassRoom::query()->where('teacher_id', Auth::id())->get(),
        ]);
    }

    public function update(Request $request, Material $materi): RedirectResponse
    {
        Gate::authorize('update', $materi);

        $request->validate([
            'class_id' => 'required|exists:class_rooms,id',
            'title' => 'required|string|max:100',
            'description' => 'nullable|string',
            'type' => 'required|in:video,text,file',
            'content' => 'required_if:type,video|nullable|string',
            'file' => 'nullable|file|mimes:pdf,doc,docx,xls,xlsx,ppt,pptx|max:20480',
        ]);

        $materi->update($request->only(['class_id', 'title', 'description', 'type']));

        // Simpan konten jika dikirimkan, atau hapus jika user mengosongkan (sedangkan tipenya bukan video)
        if ($request->has('content')) {
            $materi->content = $request->content;
        }

        // Simpan file jika ada file baru
        if ($request->hasFile('file')) {
            if ($materi->file_path && Storage::disk('public')->exists($materi->file_path)) {
                Storage::disk('public')->delete($materi->file_path);
            }
            $materi->file_path = $request->file('file')->store('materials', 'public');
        }

        $materi->save();

        ActivityLog::query()->create([
            'user_id' => Auth::id(),
            'action_type' => 'update',
            'description' => 'Memperbaharui materi: '.$materi->title,
            'subject_name' => $materi->classroom->name ?? 'N/A',
            'loggable_id' => $materi->id,
            'loggable_type' => Material::class,
        ]);

        return redirect()->route('guru.materies.index')->with('success', 'Materi Berhasil diperbaharui!');
    }

    public function show(Material $materi): Response
    {
        Gate::authorize('view', $materi);

        $materi->load('classroom');

        $completedStudents = MateriProgres::query()->where('material_id', $materi->id)
            ->where('is_completed', true)
            ->get()
            ->keyBy('student_id');

        $students = $materi->classroom->students()
            ->get()
            ->map(function ($student) use ($completedStudents) {
                $student->is_completed = $completedStudents->has($student->id);
                $student->completed_at = $student->is_completed ? $completedStudents[$student->id]->created_at : null;

                return $student;
            });

        return Inertia::render('Guru/Materi/Show', [
            'materi' => $materi,
            'students' => $students,
        ]);
    }

    public function destroy(Material $materi): RedirectResponse
    {
        Gate::authorize('delete', $materi);

        if ($materi->file_path && Storage::disk('public')->exists($materi->file_path)) {
            Storage::disk('public')->delete($materi->file_path);
        }

        ActivityLog::query()->create([
            'user_id' => Auth::id(),
            'action_type' => 'delete',
            'description' => 'Menghapus materi: '.$materi->title,
            'subject_name' => $materi->classroom->name ?? 'N/A',
            'loggable_id' => $materi->id,
            'loggable_type' => Material::class,
        ]);

        $materi->delete();

        return redirect()->route('guru.materies.index')->with('success', 'Materi Berhasil dihapus!');
    }
}
