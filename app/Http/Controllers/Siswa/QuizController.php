<?php

namespace App\Http\Controllers\Siswa;

use App\Http\Controllers\Controller;
use App\Models\Quize;

class QuizController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $classIds = $user->enrolledClasses()->pluck('class_rooms.id');

        $quizzes = Quize::whereIn('class_id', $classIds)
            ->with(['attempts' => function ($q) use ($user) {
                $q->where('student_id', $user->id);
            }, 'classroom', 'teacher'])
            ->withCount('questions')
            ->latest()
            ->paginate(10)
            ->through(function ($quiz) {
                return [
                    'id' => $quiz->id,
                    'title' => $quiz->title,
                    'mapel' => $quiz->classroom->subject ?? 'N/A',
                    'guru' => $quiz->teacher->name ?? 'N/A',
                    'jumlah_soal' => $quiz->questions_count,
                    'deadline' => $quiz->deadline->format('d M Y, H:i'),
                    'status' => $quiz->status,
                    'is_overdue' => $quiz->is_overdue,
                    'is_urgent' => $quiz->is_urgent,
                    'score' => $quiz->attempts->first()->score ?? 0,
                ];
            });

        // Untuk stats, kita butuh data mentah tanpa paginasi
        $allQuizzes = Quize::whereIn('class_id', $classIds)
            ->with(['attempts' => function ($q) use ($user) {
                $q->where('student_id', $user->id);
            }])
            ->get();

        $stats = [
            'total_selesai' => $allQuizzes->where('status', 'selesai')->count(),
            'rata_rata' => round($allQuizzes->where('status', 'selesai')->avg('score'), 1) ?: 0,
            'mendatang' => $allQuizzes->where('status', 'tersedia')->where('is_overdue', false)->count(),
        ];

        return inertia('Siswa/Quiz/Index', [
            'quizzes' => $quizzes,
            'stats' => $stats,
        ]);
    }
}
