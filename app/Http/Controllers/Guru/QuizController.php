<?php

namespace App\Http\Controllers\Guru;

use App\Http\Controllers\Controller;
use App\Models\ClassRoom;
use App\Models\QuizAttempt;
use App\Models\Quize;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class QuizController extends Controller
{
    public function index()
    {
        $teacher_id = Auth::id();

        $stats = [
            'total_quizes' => Quize::where('teacher_id', $teacher_id)->count(),
            // Mengitung siswa yang belum submit quiz
            'unsubmitted_students' => Quize::where('teacher_id', $teacher_id)
                ->with(['classroom' => function ($query) {
                    $query->withCount('students');
                }])
                ->withCount('attempts')
                ->get()
                ->sum(function ($quiz) {
                    $student_count = $quiz->classroom ? $quiz->classroom->students_count : 0;

                    return max(0, $student_count - $quiz->attempts_count);
                }),
            'avg_score' => round(QuizAttempt::whereHas('quiz', function ($q) use ($teacher_id) {
                $q->where('teacher_id', $teacher_id);
            })->avg('score') ?? 0),
        ];

        // Logik daftar quiz dengan progress
        $quizzes = Quize::where('teacher_id', $teacher_id)
            ->with(['classroom' => function ($query) {
                $query->withCount('students');
            }])
            ->withCount('attempts')
            ->latest()
            ->paginate(5)
            ->through(function ($quiz) {
                // Menghitung total siswa di kelas quiz tersebut
                $total_students = $quiz->classroom ? $quiz->classroom->students_count : 0;

                return [
                    'id' => $quiz->id,
                    'title' => $quiz->title,
                    'description' => $quiz->description,
                    'completed_count' => $quiz->attempts_count,
                    'total_students' => $total_students,
                    'remaining_days' => Carbon::parse($quiz->deadline)->diffInDays(now()),
                    'is_active' => Carbon::parse($quiz->deadline)->isFuture(),
                ];
            });

        return Inertia::render('Guru/Quiz/Index', [
            'stats' => $stats,
            'quizzes' => $quizzes,
        ]);
    }

    public function create()
    {
        $classrooms = ClassRoom::where('teacher_id', Auth::id())
            ->get(['id', 'name']);

        return Inertia::render('Guru/Quiz/Create', [
            'classrooms' => $classrooms,
        ]);
    }
}
