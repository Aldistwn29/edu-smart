<?php

namespace App\Http\Controllers\Guru;

use App\Models\ActivityLog;
use App\Models\ClassRoom;
use App\Models\Material;
use App\Models\QuizAttempt;
use App\Models\Quize;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class GuruDashboardController
{
    public function dashboard(): Response
    {
        $teacherId = Auth::id();

        // Data statistika utama
        $totalStudents = ClassRoom::query()->where('teacher_id', $teacherId)
            ->withCount('students')->get()->sum('students_count');

        $newStudentsThisMonth = User::query()->where('role', 'siswa')
            ->whereHas('enrolledClasses', function ($q) use ($teacherId) {
                $q->where('teacher_id', $teacherId)
                    ->where('classroom_user.created_at', '>=', now()->startOfMonth());
            })
            ->count();

        $stats = [
            'total_students' => [
                'value' => $totalStudents,
                'change' => "+ $newStudentsThisMonth Bulan ini",
            ],
            'total_subject' => [
                'value' => Material::query()->where('teacher_id', $teacherId)->count(),
                'change' => 'Total Materi',
            ],
            'total_quizzes' => [
                'value' => Quize::query()->where('teacher_id', $teacherId)->count(),
                'change' => 'Kuis aktif',
            ],
            'avg_score' => [
                'value' => round(QuizAttempt::query()->whereHas('quiz', function ($q) use ($teacherId) {
                    $q->where('teacher_id', $teacherId);
                })->avg('score') ?? 0, 1),
                'change' => 'Rata-rata kuis',
            ],
        ];

        // Ambil aktifitas terbaru
        $activities = ActivityLog::query()->where('user_id', $teacherId)
            ->latest()
            ->take(5)
            ->get()
            ->map(fn ($log) => [
                'id' => $log->id,
                'title' => $log->description,
                'subtitle' => $log->subject_name,
                'time' => $log->created_at->diffForHumans(),
            ]);

        return Inertia::render('Guru/Dashboard', [
            'stats' => $stats,
            'activities' => $activities,
        ]);
    }
}
