<?php

namespace App\Http\Controllers\Siswa;

use App\Models\ActivityLog;
use App\Models\ClassRoom;
use App\Models\Material;
use App\Models\MateriProgres;
use App\Models\QuizAttempt;
use App\Models\Quize;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class SiswaDashboardController
{
    public function dashboard(): Response
    {
        $user = Auth::user();
        $studentId = $user->id;

        // Ambil ID kelas yang diikuti siswa untuk efisiensi
        $enrolledClassIds = $user->enrolledClasses()->pluck('class_rooms.id');

        // Statistika umum menggunakan ID kelas yang sudah ada
        $totalMaterialsEnrolled = Material::query()
            ->whereIn('class_id', $enrolledClassIds)
            ->count();

        $completedMaterialsCount = MateriProgres::query()
            ->where('student_id', $studentId)
            ->where('is_completed', true)
            ->count();

        $enrolledQuizCount = Quize::query()
            ->whereIn('class_id', $enrolledClassIds)
            ->count();

        $completedQuizCount = QuizAttempt::query()
            ->where('student_id', $studentId)
            ->whereNotNull('end_date')
            ->count();

        $stats = [
            'materi_selesai' => "$completedMaterialsCount/$totalMaterialsEnrolled",
            'quiz_dikerjakan' => "$completedQuizCount/$enrolledQuizCount",
            'nilai_rata_rata' => (int) round(QuizAttempt::query()
                ->where('student_id', $studentId)
                ->whereNotNull('end_date')
                ->avg('score') ?? 0),
            'jam_belajar' => ActivityLog::query()->where('user_id', $studentId)->count(),
        ];

        // Progress belajar per kelas
        $progressBelajar = ClassRoom::query()
            ->whereIn('id', $enrolledClassIds)
            ->withCount('materials')
            ->get()
            ->map(function ($class) use ($studentId) {
                $totalClassMaterials = $class->materials_count;

                // Menghitung materi yang selesai di kelas ini
                $completedInClass = MateriProgres::query()
                    ->where('student_id', $studentId)
                    ->whereIn('material_id', $class->materials()->pluck('id'))
                    ->where('is_completed', true)
                    ->count();

                $percentage = $totalClassMaterials > 0
                    ? (int) round(($completedInClass / $totalClassMaterials) * 100)
                    : 0;

                return [
                    'id' => $class->id,
                    'subject' => $class->subject,
                    'last_activity' => ActivityLog::query()
                        ->where('user_id', $studentId)
                        ->where('subject_name', $class->subject)
                        ->latest()
                        ->first()?->created_at->diffForHumans() ?? 'Belum ada aktivitas',
                    'percentage' => $percentage,
                ];
            });

        // Quiz terakhir
        $quizTerakhir = QuizAttempt::query()
            ->where('student_id', $studentId)
            ->with(['quiz.classroom'])
            ->latest()
            ->take(5)
            ->get()
            ->map(fn ($attempt) => [
                'id' => $attempt->id,
                'title' => $attempt->quiz->title,
                'subject' => $attempt->quiz->classroom->subject ?? 'N/A',
                'score' => $attempt->score,
                'date' => $attempt->created_at->diffForHumans(),
            ]);

        return Inertia::render('Siswa/Dashboard', [
            'stats' => $stats,
            'progress_belajar' => $progressBelajar,
            'quiz_terakhir' => $quizTerakhir,
        ]);
    }
}
