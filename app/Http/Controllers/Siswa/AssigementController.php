<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use App\Models\Assigment;
use Illuminate\Support\Carbon;
use Inertia\Inertia;

class AssigementController extends Controller
{
    public function index()
    {
        $studentId = auth()->id();
        $now = Carbon::now();

        // Siswa terhubung ke kelas via pivot table classroom_user (many-to-many)
        // bukan lewat kolom class_id di tabel users
        $classIds = auth()->user()->enrolledClasses()->pluck('class_rooms.id');

        $assigment = Assigment::with(['teacher', 'classroom', 'submissions' => function ($q) use ($studentId) {
            $q->where('student_id', $studentId);
        }])
            ->whereIn('class_id', $classIds)
            ->get()
            ->map(function ($assigment) use ($now) {
                $submission = $assigment->submissions->first();
                $isLate = $now->greaterThan($assigment->deadline) && ! $submission;

                $status = 'Mampu di kerjakan';
                if ($isLate) {
                    $status = 'Sudah lewat';
                }
                if ($submission) {
                    $status = $submission->score !== null ? 'Sudah dinilai' : 'Sedang dinilai';
                }

                return [
                    'id' => $assigment->id,
                    'title' => $assigment->title,
                    'teacher' => $assigment->teacher?->name,
                    'deadline' => Carbon::parse($assigment->deadline)->translatedFormat('d F Y'),
                    'status' => $status,
                    'type' => $assigment->type,
                    'progress' => $submission ? 100 : 0,
                    'score' => $submission ? $submission->score : null,
                ];
            });

        $stats = [
            'total_late' => $assigment->where('status', 'Sudah lewat')->count(),
            'total_submitted' => $assigment->whereIn('status', ['Sedang dinilai', 'Sudah dinilai'])->count(),
            'total_graded' => $assigment->where('status', 'Sudah dinilai')->count(),
            'total_active' => $assigment->where('status', 'Mampu di kerjakan')->count(),
        ];

        return Inertia::render('Siswa/Assigement/Index', [
            'assigement' => $assigment,
            'stats' => $stats,
        ]);
    }
}
