<?php

namespace App\Http\Controllers\Guru;

use App\Models\ActivityLog;
use App\Models\Assigment;
use App\Models\AssigmentSubmission;
use App\Models\ClassRoom;
use App\Models\Material;
use App\Rules\SecureFileUpload;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class AssignmentsController
{
    public function index(): Response
    {
        $teacherId = Auth::id();

        $assigements = Assigment::query()->where('teacher_id', $teacherId)
            ->with(['classroom' => function ($query) {
                $query->withCount('students');
            }])
            ->withCount('submissions')
            ->latest()
            ->paginate(10);

        $stats = [
            'total_assigements' => Assigment::query()->where('teacher_id', $teacherId)->count(),
            'total_submissions' => AssigmentSubmission::query()->whereHas('assigment', function ($query) use ($teacherId) {
                $query->where('teacher_id', $teacherId);
            })->count(),
            'avg_score' => number_format(AssigmentSubmission::query()->whereHas('assigment', function ($query) use ($teacherId) {
                $query->where('teacher_id', $teacherId);
            })->avg('score') ?? 0, 1),
        ];

        return Inertia::render('Guru/Assigement/Index', [
            'assigements' => $assigements,
            'stats' => $stats,
        ]);
    }

    public function create(): Response
    {
        Gate::authorize('create', Assigment::class);

        return Inertia::render('Guru/Assigement/Create', [
            'classrooms' => ClassRoom::query()->where('teacher_id', Auth::id())->get(),
            'materials' => Material::query()->where('teacher_id', Auth::id())->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Gate::authorize('create', Assigment::class);

        $validated = $request->validate([
            'class_id' => 'required|exists:class_rooms,id',
            'material_id' => 'nullable|exists:materials,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'deadline' => 'required|date|after:now',
            'submission_types' => 'required|array|min:1',
            'attachment' => ['nullable', 'file', 'max:25600', new SecureFileUpload],
        ]);

        if ($request->hasFile('attachment')) {
            $file = $request->file('attachment');
            $extension = strtolower($file->getClientOriginalExtension());
            $filename = Str::uuid().'.'.$extension;

            $path = $file->storeAs('assignments/attachments', $filename, 'public');
            $validated['attachment_path'] = $path;
        }

        $assigment = Assigment::query()->create([
            'teacher_id' => Auth::id(),
            'class_id' => $validated['class_id'],
            'material_id' => $validated['material_id'],
            'title' => $validated['title'],
            'description' => $validated['description'],
            'deadline' => $validated['deadline'],
            'submission_types' => $validated['submission_types'],
            'attachment_path' => $validated['attachment_path'] ?? null,
        ]);

        ActivityLog::query()->create([
            'user_id' => Auth::id(),
            'action_type' => 'create',
            'description' => 'Menambahkan tugas baru: '.$assigment->title,
            'subject_name' => $assigment->classroom->name ?? 'N/A',
            'loggable_id' => $assigment->id,
            'loggable_type' => Assigment::class,
        ]);

        return redirect()->route('guru.assigments.index')->with('success', 'Tugas Berhasil diterbitkan!');
    }

    public function edit(Assigment $assigment): Response
    {
        Gate::authorize('update', $assigment);

        return Inertia::render('Guru/Assigement/Edit', [
            'assigment' => $assigment,
            'classrooms' => ClassRoom::query()->where('teacher_id', Auth::id())->get(),
            'materials' => Material::query()->where('teacher_id', Auth::id())->get(),
        ]);
    }

    public function update(Request $request, Assigment $assigment): RedirectResponse
    {
        Gate::authorize('update', $assigment);

        $validated = $request->validate([
            'class_id' => 'required|exists:class_rooms,id',
            'material_id' => 'nullable|exists:materials,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'deadline' => 'required|date|after:now',
            'submission_types' => 'required|array|min:1',
            'attachment' => ['nullable', 'file', 'max:25600', new SecureFileUpload],
        ]);

        if ($request->hasFile('attachment')) {
            // Delete old attachment if exists
            if ($assigment->attachment_path) {
                Storage::disk('public')->delete($assigment->attachment_path);
            }

            $file = $request->file('attachment');
            $extension = strtolower($file->getClientOriginalExtension());
            $filename = Str::uuid().'.'.$extension;

            $path = $file->storeAs('assignments/attachments', $filename, 'public');
            $validated['attachment_path'] = $path;
        }

        $assigment->update([
            'class_id' => $validated['class_id'],
            'material_id' => $validated['material_id'],
            'title' => $validated['title'],
            'description' => $validated['description'],
            'deadline' => $validated['deadline'],
            'submission_types' => $validated['submission_types'],
            'attachment_path' => $validated['attachment_path'] ?? $assigment->attachment_path,
        ]);

        ActivityLog::query()->create([
            'user_id' => Auth::id(),
            'action_type' => 'update',
            'description' => 'Memperbaharui tugas: '.$assigment->title,
            'subject_name' => $assigment->classroom->name ?? 'N/A',
            'loggable_id' => $assigment->id,
            'loggable_type' => Assigment::class,
        ]);

        return redirect()->route('guru.assigments.index')->with('success', 'Tugas Berhasil diperbaharui!');
    }

    public function submissions(Assigment $assigment): Response
    {
        Gate::authorize('view', $assigment);

        $assigment->load(['classroom.students']);

        $submissions = $assigment->classroom->students->map(function ($student) use ($assigment) {
            $submission = AssigmentSubmission::query()->where('assigment_id', $assigment->id)
                ->where('student_id', $student->id)
                ->first();

            return [
                'student' => $student,
                'submission' => $submission,
            ];
        });

        return Inertia::render('Guru/Assigement/Submissions', [
            'assigment' => $assigment,
            'submissions' => $submissions,
        ]);
    }

    public function grade(Request $request, AssigmentSubmission $submission): RedirectResponse
    {
        Gate::authorize('grade', $submission->assigment);

        $validated = $request->validate([
            'score' => 'required|numeric|min:0|max:100',
            'feedback' => 'nullable|string',
        ]);

        $submission->update([
            'score' => $validated['score'],
            'feedback' => $validated['feedback'],
            'graded_at' => now(),
        ]);

        ActivityLog::query()->create([
            'user_id' => Auth::id(),
            'action_type' => 'grade',
            'description' => 'Memberikan nilai untuk tugas: '.$submission->assigment->title.' kepada '.$submission->student->name,
            'subject_name' => $submission->assigment->classroom->name ?? 'N/A',
            'loggable_id' => $submission->id,
            'loggable_type' => AssigmentSubmission::class,
        ]);

        return redirect()->back()->with('success', 'Penilaian berhasil disimpan!');
    }

    public function destroy(Assigment $assigment): RedirectResponse
    {
        Gate::authorize('delete', $assigment);

        // Delete attachment if exists
        if ($assigment->attachment_path) {
            Storage::disk('public')->delete($assigment->attachment_path);
        }

        $title = $assigment->title;
        $classroomName = $assigment->classroom->name ?? 'N/A';

        $assigment->delete();

        ActivityLog::query()->create([
            'user_id' => Auth::id(),
            'action_type' => 'delete',
            'description' => 'Menghapus tugas: '.$title,
            'subject_name' => $classroomName,
            'loggable_id' => null,
            'loggable_type' => Assigment::class,
        ]);

        return redirect()->back()->with('success', 'Tugas berhasil dihapus');
    }
}
