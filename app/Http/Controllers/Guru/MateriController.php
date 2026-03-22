<?php

namespace App\Http\Controllers\Guru;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\ClassRoom;
use App\Models\Material;
use App\Models\MateriProgres;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;

class MateriController extends Controller
{
    public function index(Request $request)
    {
        $query = Material::where('teacher_id', Auth::id())
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

    public function create()
    {
        return Inertia::render('Guru/Materi/Create', [
            'classrooms' => ClassRoom::where('teacher_id', Auth::id())->get(),
        ]);
    }

    public function store(Request $request)
    {
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

        ActivityLog::create([
            'user_id' => Auth::id(),
            'action_type' => 'create',
            'description' => 'Menambahkan materi baru: '.$material->title,
            'subject_name' => $material->classroom->name,
            'loggable_id' => $material->id,
            'loggable_type' => Material::class,
        ]);

        return redirect()->route('guru.materies.index')->with('success', 'Materi Berhasil diterbitkan!');
    }

    public function edit(Material $materi)
    {
        return Inertia::render('Guru/Materi/Edit', [
            'materi' => $materi,
            'classrooms' => ClassRoom::where('teacher_id', Auth::id())->get(),
        ]);
    }

    public function update(Request $request, Material $materi)
    {

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
        // Note: Untuk update, kita perlu bisa mengosongkan content?
        // Karena input form bisa mengirim string kosong
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

        ActivityLog::create([
            'user_id' => Auth::id(),
            'action_type' => 'update',
            'description' => 'Memperbaharui materi: '.$materi->title,
            'subject_name' => $materi->classroom->name,
            'loggable_id' => $materi->id,
            'loggable_type' => Material::class,
        ]);

        return redirect()->route('guru.materies.index')->with('success', 'Materi Berhasil diperbaharui!');
    }

    public function show(Material $materi)
    {
        $materi->load('classroom');

        $completedStudents = MateriProgres::where('material_id', $materi->id)
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

    public function destroy(Material $materi)
    {
        if ($materi->file_path && Storage::disk('public')->exists($materi->file_path)) {
            Storage::disk('public')->delete($materi->file_path);
        }

        ActivityLog::create([
            'user_id' => Auth::id(),
            'action_type' => 'delete',
            'description' => 'Menghapus materi: '.$materi->title,
            'subject_name' => $materi->classroom->name,
            'loggable_id' => $materi->id,
            'loggable_type' => Material::class,
        ]);

        $materi->delete();

        return redirect()->route('guru.materies.index')->with('success', 'Materi Berhasil dihapus!');
    }
}
