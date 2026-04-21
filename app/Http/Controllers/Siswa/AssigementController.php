<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use App\Models\Assigment;
use Illuminate\Support\Carbon;
use Inertia\Inertia;
use Inertia\Response;

class AssigementController extends Controller
{
    public function index(): Response
    {
        $studentId = auth()->id();
        $now = Carbon::now();

        // Siswa terhubung ke kelas via pivot table classroom_user (many-to-many)
        // bukan lewat kolom class_id di tabel users
        $classIds = auth()->user()->enrolledClasses()->pluck('class_rooms.id');

        $assignments = Assigment::with(['teacher', 'classroom', 'submissions' => function ($q) use ($studentId) {
            $q->where('student_id', $studentId);
        }])
            ->whereIn('class_id', $classIds)
            ->get()
            ->map(function ($assignment) use ($now) {
                $submission = $assignment->submissions->first();
                $isLate = $now->greaterThan($assignment->deadline) && ! $submission;

                $status = 'Mampu di kerjakan';
                if ($isLate) {
                    $status = 'Sudah lewat';
                }
                if ($submission) {
                    $status = $submission->score !== null ? 'Sudah dinilai' : 'Sedang dinilai';
                }

                return [
                    'id' => $assignment->id,
                    'title' => $assignment->title,
                    'teacher' => $assignment->teacher?->name,
                    'deadline' => Carbon::parse($assignment->deadline)->translatedFormat('d F Y'),
                    'status' => $status,
                    'type' => $assignment->type,
                    'progress' => $submission ? 100 : 0,
                    'score' => $submission ? $submission->score : null,
                ];
            });

        $stats = [
            'total_late' => $assignments->where('status', 'Sudah lewat')->count(),
            'total_submitted' => $assignments->whereIn('status', ['Sedang dinilai', 'Sudah dinilai'])->count(),
            'total_graded' => $assignments->where('status', 'Sudah dinilai')->count(),
            'total_active' => $assignments->where('status', 'Mampu di kerjakan')->count(),
        ];

        return Inertia::render('Siswa/Assigement/Index', [
            'assigement' => $assignments,
            'stats' => $stats,
        ]);
    }

    public function show(Assigment $assigment): Response
    {
        $studentId = auth()->id();
        $assigment->load(['teacher', 'submissions' => function ($q) use ($studentId) {
            $q->where('student_id', $studentId);
        }]);

        $submission = $assigment->submissions->first();

        return Inertia::render('Siswa/Assigement/Show', [
            'assigement' => [
                'id' => $assigment->id,
                'title' => $assigment->title,
                'teacher' => $assigment->teacher?->name,
                'deadline' => Carbon::parse($assigment->deadline)->translatedFormat('d F Y'),
                'description' => $assigment->description ?? 'Tidak ada deskripsi tambahan',
                'status' => $submission ? ($submission->score !== null ? 'Sudah dinilai' : 'Sedang dinilai') : (Carbon::now()->greaterThan($assigment->deadline) ? 'Sudah lewat' : 'Mampu di kerjakan'),
                'submission' => $submission ? [
                    'file_path' => $submission->file_path,
                    'score' => $submission->score,
                    'note' => $submission->note,
                ] : null,
            ],
        ]);
    }
}
