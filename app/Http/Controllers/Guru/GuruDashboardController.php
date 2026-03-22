<?php

namespace App\Http\Controllers\Guru;

use App\Http\Controllers\Controller;
use App\Models\ActivityLog;
use App\Models\ClassRoom;
use App\Models\Material;
use App\Models\QuizAttempt;
use App\Models\Quize;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class GuruDashboardController extends Controller
{
    public function dashboard()
    {
        $teacher_id = Auth::id();

        // Data statistika utama
        $totalStudents = ClassRoom::where('teacher_id', $teacher_id)
            ->withCount('students')->get()->sum('students_count');

        $newStudentsThisMonth = User::where('role', 'siswa')
            ->whereHas('enrolledClasses', function ($q) use ($teacher_id) {
                $q->where('teacher_id', $teacher_id)
                    ->where('classroom_user.created_at', '>=', now()->startOfMonth());
            })
            ->count();

        $stats = [
            'total_students' => [
                'value' => $totalStudents,
                'change' => "+ $newStudentsThisMonth Bulan ini",
            ],
            'total_subject' => [
                'value' => Material::where('teacher_id', $teacher_id)->count(),
                'change' => 'Total Materi',
            ],
            'total_quizzes' => [
                'value' => Quize::where('teacher_id', $teacher_id)->count(),
                'change' => 'Kuis aktif',
            ],
            'avg_score' => [
                'value' => round(QuizAttempt::whereHas('quiz', function ($q) use ($teacher_id) {
                    $q->where('teacher_id', $teacher_id);
                })->avg('score') ?? 0, 1),
                'change' => 'Rata-rata kuis',
            ],
        ];

        // Ambil aktifitas terbaru (dari semua guru jika ingin global, atau spesifik guru)
        $activities = ActivityLog::where('user_id', $teacher_id)
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
